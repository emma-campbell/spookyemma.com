import Image from "next/image";

const MdxImage = (props: any) => {
  // Handle the props that MDXRemote passes for markdown images
  const { src, alt } = props;
  
  // Return null if no src provided
  if (!src) {
    console.error('MdxImage: No src provided', props);
    return null;
  }
  
  // Use default dimensions for local images
  const isExternal = src.startsWith('http://') || src.startsWith('https://');
  
  return (
    <Image
      src={src}
      alt={alt || ''}
      width={800}
      height={600}
      className="rounded-sm shadow-sm max-h-96 w-auto"
      unoptimized={isExternal}
      style={{ height: 'auto' }}
    />
  );
};

export default MdxImage;