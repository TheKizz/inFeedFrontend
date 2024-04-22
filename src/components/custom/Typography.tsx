type type = 'title' | 'body';
type titleVariant = 'h1' | 'h2' | 'h3' | 'h4';
type bodyVariant =
  | 'p'
  | 'blockquote'
  | 'inlineCode'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

interface Props<T extends type> {
  type: T;
  variant: T extends 'title' ? titleVariant : bodyVariant;
  children?: unknown;
  className?: string;
}

export const Typography = <T extends type = 'body'>(props: Props<T>) => {
  const { type, variant, children, className } = props;
  switch (type) {
    case 'title':
      return Title(variant as titleVariant, children, className);
    case 'body':
      return Body(variant as bodyVariant, children, className);
    default:
      throw new Error('Invalid type');
  }
};

const Title = (
  variant: titleVariant,
  children?: unknown,
  className?: string,
) => {
  const VariantH1 = (children?: unknown) => {
    return (
      <h1
        className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
      >
        <>{children}</>
      </h1>
    );
  };
  const VariantH2 = (children?: unknown) => {
    return (
      <h2
        className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
      >
        <>{children}</>
      </h2>
    );
  };
  const VariantH3 = (children?: unknown) => {
    return (
      <h3
        className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
      >
        <>{children}</>
      </h3>
    );
  };
  const VariantH4 = (children?: unknown) => {
    return (
      <h4
        className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
      >
        <>{children}</>
      </h4>
    );
  };

  switch (variant) {
    case 'h1':
      return VariantH1(children);
    case 'h2':
      return VariantH2(children);
    case 'h3':
      return VariantH3(children);
    case 'h4':
      return VariantH4(children);
    default:
      throw new Error('Invalid title variant');
  }
};

const Body = (
  variant: bodyVariant,
  children?: unknown,
  className?: string,
) => {
  const VariantP = (children?: unknown) => {
    return (
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
        <>{children}</>
      </p>
    );
  };
  const VariantBlockquote = (children?: unknown) => {
    return (
      <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
        <>{children}</>
      </blockquote>
    );
  };
  const VariantInlineCode = (children?: unknown) => {
    return (
      <code
        className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
      >
        <>{children}</>
      </code>
    );
  };
  const VariantLead = (children?: unknown) => {
    return (
      <p className={`text-xl text-muted-foreground ${className}`}>
        <>{children}</>
      </p>
    );
  };
  const VariantLarge = (children?: unknown) => {
    return (
      <p className={`text-lg font-semibold ${className}`}>
        <>{children}</>
      </p>
    );
  };

  const VariantSmall = (children?: unknown) => {
    return (
      <small className={`text-sm font-medium leading-none ${className}`}>
        <>{children}</>
      </small>
    );
  };
  const VariantMuted = (children?: unknown) => {
    return (
      <p className={'text-sm text-muted-foreground ${className}'}>
        <>{children}</>
      </p>
    );
  };

  switch (variant) {
    case 'p':
      return VariantP(children);
    case 'blockquote':
      return VariantBlockquote(children);
    case 'inlineCode':
      return VariantInlineCode(children);
    case 'lead':
      return VariantLead(children);
    case 'large':
      return VariantLarge(children);
    case 'small':
      return VariantSmall(children);
    case 'muted':
      return VariantMuted(children);
    default:
      throw new Error('Invalid body variant');
  }
};
