import React from "react";
import { Button } from "react-bootstrap";
import { IconContext } from "react-icons/lib";
import { FaGithub } from "react-icons/fa";

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
}

const GithubButton: React.FC<Props> = (props) => {
  return (
    <Button
      variant="dark"
      size="sm"
      href={props.href}
      target="_blank"
      style={{ paddingTop: "0.4em", ...props.style }}
      className={props.className}
    >
      <IconContext.Provider value={{ color: "#fff", size: "1.5em" }}>
        <FaGithub style={{ marginTop: "-0.2em", marginRight: "0.5em" }} />
      </IconContext.Provider>
      View on GitHub
    </Button>
  );
};

export default GithubButton;
