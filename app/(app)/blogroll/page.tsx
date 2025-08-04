import { AccessibleLink } from "@/components/ui/accessible-link";

const links = [
  {
    text: "Winnie Lim",
    href: "https://winnielim.org",
  },
  {
    text: "Rachel Smith",
    href: "https://rachsmith.com",
  },
  {
    text: "Manu Moreale",
    href: "https://manuelmoreale.com",
  },
  {
    text: "Steph Ango",
    href: "https://stephango.com/",
  },
  {
    text: "Your Local Epidemiologist",
    href: "https://yourlocalepidemiologist.substack.com"
  },
  {
    text: "Health API Guy",
    href: "https://healthapiguy.substack.com"
  },
];

export default function Blogroll() {
  return (
    <>
      <h1 className={"font-sans uppercase text-body text-4xl pb-2"}>
        Blogroll
      </h1>
      <p className={"text-body"}>
        This is a list off the blogs that read frequently or subscribe to in my
        RSS reader.
      </p>
      <section id="blogroll" className="space-y-12 pt-8 text-body">
        <ul className="list-disc list-inside [&_a]:underline">
          {links.map((l) => (
            <li key={l.text}>
              <AccessibleLink href={l.href}>{l.text}</AccessibleLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
