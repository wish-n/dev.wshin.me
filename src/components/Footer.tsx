export default function Footer(props: FooterProps) {
  return (
    <footer className="select-none">
      <p className="text-sm">
        &copy; {props.year} {props.blogTitle}
      </p>
    </footer>
  );
}

interface FooterProps {
  year: number;
  blogTitle: string;
}
