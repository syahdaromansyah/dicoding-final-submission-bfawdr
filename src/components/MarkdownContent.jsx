import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import remarkGfm from 'remark-gfm';

export default function MarkdownContent({ children }) {
  const customReactMdComponents = useMemo(() => generateCustomComponents(), []);

  const remarkPlugins = [remarkGfm];

  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      components={customReactMdComponents}
    >
      {String(children)}
    </Markdown>
  );
}

MarkdownContent.propTypes = {
  children: PropTypes.string.isRequired,
};

function generateCustomComponents() {
  return {
    h1(props) {
      const { node: _, ...rest } = props;

      return (
        <h1
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-4 font-space-grotesk text-4xl font-bold lg:text-5xl dark:border-gray-700"
        />
      );
    },
    h2(props) {
      const { node: _, ...rest } = props;

      return (
        <h2
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-4 font-space-grotesk text-3xl font-bold lg:text-4xl dark:border-gray-700"
        />
      );
    },
    h3(props) {
      const { node: _, ...rest } = props;

      return (
        <h3
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk text-2xl font-bold lg:text-3xl dark:border-gray-700"
        />
      );
    },
    h4(props) {
      const { node: _, ...rest } = props;

      return (
        <h4
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk text-xl font-bold lg:text-2xl dark:border-gray-700"
        />
      );
    },
    h5(props) {
      const { node: _, ...rest } = props;

      return (
        <h5
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk text-lg font-bold lg:text-xl dark:border-gray-700"
        />
      );
    },
    h6(props) {
      const { node: _, ...rest } = props;

      return (
        <h6
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk font-bold lg:text-lg dark:border-gray-700"
        />
      );
    },
    p(props) {
      const { node: _, ...rest } = props;

      return <p {...rest} className="mb-4 lg:text-lg" />;
    },
    blockquote(props) {
      const { node: _, ...rest } = props;

      return (
        <blockquote
          {...rest}
          className="mb-4 border-l-4 border-gray-600 pl-2 text-slate-600 dark:text-slate-300"
        />
      );
    },
    a(props) {
      const { node: _, ...rest } = props;

      return (
        <a
          {...rest}
          className="inline-block text-blue-600 transition hover:underline dark:text-blue-400"
        >
          {props.children}
        </a>
      );
    },
    hr(props) {
      const { node: _, ...rest } = props;

      return <hr {...rest} className="mb-4" />;
    },
    img(props) {
      const { node: _, ...rest } = props;

      return (
        <span className="block text-center">
          <img {...rest} className="inline-block" />
        </span>
      );
    },
    ul(props) {
      const { node: _, ...rest } = props;

      return (
        <div className="mb-4 pl-4 ">
          <ul
            {...rest}
            className="list-inside list-disc [&_ul]:mb-0 [&_ul]:pl-2"
          />
        </div>
      );
    },
    ol(props) {
      const { node: _, ...rest } = props;

      return (
        <div className="mb-4 pl-4 ">
          <ol
            {...rest}
            className="list-inside list-decimal [&_ul]:mb-0 [&_ul]:pl-2"
          />
        </div>
      );
    },
    li(props) {
      const { node: _, ...rest } = props;
      return <li {...rest} className="lg:text-lg" />;
    },
    code(props) {
      const { node: _, children, className, ...rest } = props;
      const match = /language-(\w+)/.exec(className || '');

      return match ? (
        <div className="mb-4 overflow-hidden rounded [&_code]:!font-jetbrains-mono md:[&_code]:!text-lg">
          <SyntaxHighlighter
            {...rest}
            showLineNumbers
            PreTag="div"
            language={match[1]}
            style={atomOneDark}
          >
            {String(children || '').replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          {...rest}
          className="inline-block rounded-md bg-gray-800 px-2 py-1 font-jetbrains-mono text-slate-100"
        >
          {children}
        </code>
      );
    },
    table(props) {
      const { node: _, ...rest } = props;

      return (
        <table
          {...rest}
          className="mb-4 border-collapse border-0 border-gray-800"
        />
      );
    },
    th(props) {
      const { node: _, ...rest } = props;

      return (
        <th
          {...rest}
          className="border-2 border-gray-300 bg-gray-200 p-4 font-space-grotesk dark:border-gray-700 dark:bg-gray-800"
        />
      );
    },
    td(props) {
      const { node: _, ...rest } = props;

      return (
        <td
          {...rest}
          className="border-2 border-gray-300 p-4 dark:border-gray-700"
        />
      );
    },
  };
}
