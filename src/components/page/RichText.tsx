import Image from "next/image";
import type { ReactNode } from "react";
import type { RichTextContent, RichTextNode } from "@/data/pages/types";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";

type Content = RichTextContent | string[];

function safeHref(value: unknown): string | undefined {
  if (typeof value !== "string" || value.startsWith("//")) return undefined;
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  if (value.startsWith("/") || value.startsWith("#")) return value;
  return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeImageSrc(value: unknown): string | undefined {
  if (typeof value !== "string" || value.startsWith("//")) return undefined;
  return /^https?:\/\//i.test(value) || value.startsWith("/") ? value : undefined;
}

function childrenOf(node: RichTextNode, key: string, unorderedListClassName?: string) {
  return Array.isArray(node.children)
    ? node.children.map((child, index) => renderNode(child, `${key}-${index}`, undefined, unorderedListClassName))
    : null;
}

function renderNode(node: RichTextNode, key: string, className?: string, unorderedListClassName?: string): ReactNode {
  const children = childrenOf(node, key, unorderedListClassName);
  if (node.type === "text") {
    let content: ReactNode = node.text ?? "";
    if (node.code === true) content = <code>{content}</code>;
    if (node.strikethrough === true) content = <s>{content}</s>;
    if (node.underline === true) content = <u>{content}</u>;
    if (node.italic === true) content = <em>{content}</em>;
    if (node.bold === true) content = <strong>{content}</strong>;
    return <span key={key}>{content}</span>;
  }

  if (node.type === "link") {
    const href = safeHref(node.url);
    return href ? <a key={key} href={href}>{children}</a> : <span key={key}>{children}</span>;
  }

  switch (node.type) {
    case "paragraph":
      return <p key={key} className={className}>{children}</p>;
    case "heading": {
      const level = Number(node.level);
      if (level === 1) return <h1 key={key} className={className}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={className}>{children}</h2>;
      if (level === 3) return <h3 key={key} className={className}>{children}</h3>;
      if (level === 4) return <h4 key={key} className={className}>{children}</h4>;
      if (level === 5) return <h5 key={key} className={className}>{children}</h5>;
      return <h6 key={key} className={className}>{children}</h6>;
    }
    case "list":
      return node.format === "ordered"
        ? <ol key={key} className={className}>{children}</ol>
        : <ul key={key} className={unorderedListClassName ?? className}>{children}</ul>;
    case "list-item":
      return <li key={key}>{children}</li>;
    case "quote":
      return <blockquote key={key} className={className}>{children}</blockquote>;
    case "code":
      return <pre key={key} className={className}><code>{children}</code></pre>;
    case "image": {
      const image = isRecord(node.image) ? node.image : {};
      const src = safeImageSrc(image.url);
      if (!src) return null;
      const width = typeof image.width === "number" && image.width > 0 ? image.width : 1200;
      const height = typeof image.height === "number" && image.height > 0 ? image.height : 800;
      return (
        <figure key={key} className={className}>
          <Image
            src={contentImageSrc(src)}
            alt={typeof image.alternativeText === "string" ? image.alternativeText : ""}
            width={width}
            height={height}
            unoptimized={isRemoteContentImage(src)}
          />
        </figure>
      );
    }
    default:
      return <span key={key} className={className}>{children}</span>;
  }
}

export function RichText({ content, className, unorderedListClassName }: { content?: Content; className?: string; unorderedListClassName?: string }) {
  if (typeof content === "string") {
    return content ? <p className={className}>{content}</p> : null;
  }
  if (!Array.isArray(content) || content.length === 0) return null;

  const paragraphs = content.filter((item): item is string => typeof item === "string");
  if (paragraphs.length === content.length) {
    return paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`} className={className}>{paragraph}</p>);
  }

  return content.flatMap((node, index) =>
    typeof node === "object" && node !== null ? [renderNode(node, `rich-${index}`, className, unorderedListClassName)] : []
  );
}

export function richTextToPlainText(content?: Content): string | undefined {
  if (typeof content === "string") return content || undefined;
  if (!Array.isArray(content)) return undefined;

  const extract = (nodes: unknown[]): string =>
    nodes
      .map((node) => {
        if (typeof node === "string") return node;
        if (!node || typeof node !== "object") return "";
        if (!isRecord(node) || typeof node.type !== "string") return "";
        if (node.type === "text") return typeof node.text === "string" ? node.text : "";
        return Array.isArray(node.children) ? extract(node.children) : "";
      })
      .filter(Boolean)
      .join(" ");

  return extract(content) || undefined;
}
