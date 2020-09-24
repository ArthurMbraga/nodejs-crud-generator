import React, { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IconContext } from "react-icons/lib";
import { BsDownload } from "react-icons/bs";
import { StyledButton } from "../FieldItem/styled";
import { TextFile } from "../../types";

interface Props {
  files: TextFile;
  children?: React.ReactNode;
}

const FileShow: React.FC<Props> = (props) => {
  const [textFiles, setTextFiles] = useState<TextFile>(props.files);

  const downloadFile = (content: string, fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      {Object.keys(props.files).map((fileName, index) => {
        const content = props.files[fileName];
        return (
          <Accordion defaultActiveKey={`${index}`} key={index} className="my-2">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                variant="link"
                eventKey={`${index}`}
                className="d-flex"
              >
                <p className="m-0 align-self-center">{fileName}</p>
                <StyledButton
                  className="ml-auto"
                  variant="outline-light"
                  onClick={() => {
                    downloadFile(content, fileName);
                  }}
                >
                  <IconContext.Provider value={{ color: "#666" }}>
                    <BsDownload />
                  </IconContext.Provider>
                </StyledButton>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                  <SyntaxHighlighter
                    language="javascript"
                    style={docco}
                    className="rounded"
                  >
                    {content}
                  </SyntaxHighlighter>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}
    </>
  );
};

export default FileShow;
