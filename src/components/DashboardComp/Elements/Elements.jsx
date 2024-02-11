import "./Elements.css";

const Elements = ({ title, elements }) => {
  return (
    <div className="w-100">
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {elements.map((item, index) => {
          return (
            <p key={index * 55} className="col-md-2 p-2 text-center border">
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Elements;
