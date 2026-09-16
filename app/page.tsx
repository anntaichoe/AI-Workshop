export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="hero">
        <h1>Ann Tai</h1>
        <p className="subtitle">lecturer of applied linguistics</p>
      </section>

      <section className="this-semester">
        <h2>This semester</h2>
        {/* Placeholder items below — replace with real details about this semester's courses, research, and mentoring. */}
        <ul>
          <li>SLS 480E</li>
          <li>my AIR project</li>
          <li>learning Chinese</li>
        </ul>
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

      <footer>
        <p>
          Ann Tai &copy; {currentYear}
        </p>
        <p>Built with Claude Code</p>
      </footer>
    </>
  );
}
