/** Chunk HTML by top-level block tags so very large strings can be inserted progressively. */
export function chunkHTMLByBlocks(content: string): string[] {
  const chunks: string[] = [];
  const stack: { tag: string; startIndex: number }[] = [];
  if (!content) {
    return chunks;
  }

  // 匹配所有 HTML 标签，包括起始和结束标签
  const tagRegex = /<\/?([a-zA-Z0-9-]+)[^>]*>/g;

  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = tagRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1];
    const isClosingTag = fullMatch.startsWith('</');
    const currentIndex = match.index;

    if (!isClosingTag) {
      stack.push({ tag: tagName, startIndex: currentIndex });
    } else {
      const lastTag = stack.pop();
      if (lastTag && lastTag.tag === tagName) {
        const chunk = content.slice(lastTag.startIndex, currentIndex + fullMatch.length);
        if (stack.length === 0) {
          chunks.push(chunk);
          lastIndex = currentIndex + fullMatch.length;
        }
      }
    }
  }

  if (lastIndex < content.length) {
    const remainingContent = content.slice(lastIndex).trim();
    if (remainingContent) {
      chunks.push(remainingContent);
    }
  }

  return chunks;
}

function insertChunkSafely(editor: any, chunk: string): void {
  const currentLength = editor.getLength();
  editor.clipboard.dangerouslyPasteHTML(currentLength - 1, chunk);
}

/** Progressively insert chunks into a Quill editor instance, ~100ms per chunk. */
export function lazyLoadContent(quillInstance: any, contentChunks: string[]): void {
  if (!quillInstance) {
    return;
  }

  let chunkIndex = 0;
  const interval = setInterval(() => {
    if (chunkIndex >= contentChunks.length) {
      clearInterval(interval);
      return;
    }
    const chunk = contentChunks[chunkIndex];
    insertChunkSafely(quillInstance, chunk);
    chunkIndex++;
  }, 100);
}
