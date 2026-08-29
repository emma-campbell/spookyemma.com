// hdr-resize <input> <output> <targetWidth> <quality 0-1>
//
// Resizes a JPEG while preserving its HDR gain map (Apple or ISO 21496-1), so
// Safari and Chrome on HDR displays still render the photo with HDR headroom.
// Bakes in EXIF orientation and drops all other metadata (EXIF, GPS, XMP).
// The gain map is rescaled at the same ratio and keeps its headroom metadata.
//
// Compiled on demand by scripts/images/hdr.mjs into node_modules/.cache.
// macOS 15+ (CIImageRepresentationOption.hdrGainMapImage).
import Foundation
import CoreImage
import ImageIO

func fail(_ message: String, code: Int32 = 1) -> Never {
    FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
    exit(code)
}

let args = CommandLine.arguments
guard args.count == 5, let targetWidth = Double(args[3]), let quality = Double(args[4]) else {
    fail("usage: hdr-resize <input> <output> <targetWidth> <quality>", code: 2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

guard let base = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else {
    fail("cannot read \(args[1])")
}
let gain = CIImage(contentsOf: inURL, options: [.auxiliaryHDRGainMap: true, .applyOrientationProperty: true])

func scaled(_ image: CIImage, toWidth w: Double) -> CIImage {
    let s = w / image.extent.width
    if s >= 1 { return image }
    return image.applyingFilter("CILanczosScaleTransform", parameters: [kCIInputScaleKey: s, kCIInputAspectRatioKey: 1.0])
}

let width = min(targetWidth, base.extent.width)
// settingProperties([:]) drops the source EXIF/GPS/XMP from the base image; the gain
// map keeps its own properties, which carry the headroom metadata readers need.
let outBase = scaled(base, toWidth: width).settingProperties([:])
var options: [CIImageRepresentationOption: Any] = [
    CIImageRepresentationOption(rawValue: kCGImageDestinationLossyCompressionQuality as String): quality
]
if let gain = gain {
    options[.hdrGainMapImage] = scaled(gain, toWidth: width * (gain.extent.width / base.extent.width))
}
let colorSpace = base.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!
do {
    try CIContext().writeJPEGRepresentation(of: outBase, to: outURL, colorSpace: colorSpace, options: options)
} catch {
    fail("write failed: \(error)")
}
print("\(Int(outBase.extent.width))x\(Int(outBase.extent.height)) gainmap=\(gain != nil)")
