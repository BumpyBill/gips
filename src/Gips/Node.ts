import Script from "./Script";

export default interface Node {
  parent?: Node;
  children: Node[];

  scripts: Script[];

  // components
}
