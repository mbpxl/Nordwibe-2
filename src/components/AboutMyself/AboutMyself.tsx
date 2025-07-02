import ShowMore from "../ShowMore/ShowMore";

const text = `Учусь на программиста, но в свободное время люблю заниматься спортом, особенно футболом и плаванием. Обожаю путешествовать, открывать новые места и знакомиться с интересными людьми. Работаю в IT над крутыми проектами и, возможно, даже создать что-то своё. Люблю активный образ жизни, но иногда не прочь просто посмотреть хороший фильм или поиграть в игры с друзьями.`;

const AboutMyself = () => {
  return (
    <div className="text-black">
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
        О себе
      </h1>
      <ShowMore maxHeight={72}>{text}</ShowMore>
    </div>
  );
};

export default AboutMyself;
