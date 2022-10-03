import Header from "./header";
import Content from "./content";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header text={course.name} />
            <Content parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
