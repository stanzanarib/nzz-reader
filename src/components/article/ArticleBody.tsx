export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
    </div>
  );
}