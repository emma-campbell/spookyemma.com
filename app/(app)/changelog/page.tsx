
import fs from "fs";
import { components } from "@/components/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Changelog() {
  const changelog = fs.readFileSync("CHANGELOG.md").toString();

  return (
    <>
      <h1 className={"font-sans text-4xl pb-4"}>
        Changelog
      </h1>
      <p className={"text-text"}>
        A <i>changelog</i> is a document that collects records of changes made
        to a piece of software. Here are all the ways this site has changed over
        time.
      </p>
      <section className={"text-body pt-3 space-y-4"}>
        <MDXRemote source={changelog} components={components} />
      </section>
    </>
  );
}
