import { LastUpdated } from "@/components/layout/last-updated";
import { AccessibleLink } from "@/components/ui/accessible-link";

/**
 * Renders the Colophon page which provides information about the website's
 * publication, development, hosting, and other technical details.
 */
export default function Colophon() {
  /**
   * The date when the website was last updated.
   */
  const updated = new Date(2025, 7, 4, 0, 19);

  return (
    <>
      <h1 className={"font-sans uppercase text-body text-4xl pb-2"}>
        Colophon
      </h1>
      <section className="flex flex-col space-y-4 [&_a]:underline text-body">
        <p>
          This website was originally published January 14th, 2024 near
          Washington, D.C. It&apos;s developed on a 2021 M1 Macbook Pro and
          hosted on{" "}
          <AccessibleLink href="https://www.digitalocean.com/">
            Digital Ocean
          </AccessibleLink>
          . All content was migrated from my previous domain emmacampbell.dev.
          The code is open source on{" "}
          <AccessibleLink href="https://github.com/emma-campbell/spooklore">
            Github
          </AccessibleLink>
          .
        </p>
        <p>
          The sans serif font for this site is{" "}
          <AccessibleLink href="https://www.fontspring.com/fonts/type-forward/garet">Garet</AccessibleLink>.
        </p>
        <p>
          This site was built using{" "}
          <AccessibleLink href="https://nextjs.org/">Next.Js</AccessibleLink>
        </p>
        <p>
          All content is hosted in Github, and uses{" "}
          <AccessibleLink href="https://keystatic.com/">Keystatic</AccessibleLink>{" "}
          to write, parse and display posts.
        </p>
        <LastUpdated date={updated} />
      </section>
    </>
  );
}
