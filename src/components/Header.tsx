import Link from "next/link";

export default function Header(props: HeaderProps) {
  return (
    <header className="flex flex-row justify-between align-middle">
      <Link href="/">
        <h1 className="highlight select-none text-xl font-bold">{props.blogTitle}</h1>
      </Link>
      <Navigator navLinks={props.navLinks} />
    </header>
  );
}

interface HeaderProps {
  blogTitle: string;
  navLinks: { name: string; url: string }[];
}

function Navigator(props: NavigatorProps) {
  return (
    <nav>
      <ul className="flex select-none flex-row justify-end align-middle font-medium [&>li]:ml-5">
        {props.navLinks.map(link => (
          <li key={link.name}>
            <Link href={link.url}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface NavigatorProps {
  navLinks: { name: string; url: string }[];
}
