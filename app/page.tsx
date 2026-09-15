export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="hero">
        <h1>Ann Tai</h1>
        <p className="subtitle">lecturer of applied linguistics</p>
      </section>

      <section className="about">
        <h2>About</h2>
        <p>
          Ann Tai is a lecturer of applied linguistics whose work centers on
          how people acquire and use additional languages in real classrooms.
          She is especially interested in the interplay between language
          teaching methods and the way learners actually pick up new
          language over time. Her teaching draws on current research to help
          students build practical, lasting language skills.
        </p>
      </section>

      <section className="this-semester">
        <h2>This semester</h2>
        {/* Placeholder items below — replace with real details about this semester's courses, research, and mentoring. */}
        <ul>
          <li>Teaching an introductory course in second language acquisition</li>
          <li>Conducting research on classroom discourse and learner feedback</li>
          <li>Mentoring graduate students on their applied linguistics theses</li>
        </ul>
      </section>

      <footer>
        <p>
          Ann Tai &copy; {currentYear}
        </p>
      </footer>
    </>
  );
}
