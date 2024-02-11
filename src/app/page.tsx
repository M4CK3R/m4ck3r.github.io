"use client";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.description}>
      <p>
        As a software developer, I bring a blend of hands-on experience and a
        strong foundation in learning and adapting to new technologies quickly.
        My eagerness to learn, coupled with my ability to grasp concepts
        swiftly, has enabled me to contribute effectively in dynamic and
        fast-paced environments.
      </p>
      <p>
        Proficient in <span className={styles.highlight}>web application development</span> using <span className={styles.highlight}>.NET Core</span> framework, <span className={styles.highlight}>Razor</span>, and <span className={styles.highlight}>Entity Framework</span>, I prioritize high-quality code and
        adherence to best practices. I have integrated <span className={styles.highlight}>third-party APIs</span> such as <span className={styles.highlight}>SendGrid</span> to automate processes, ensuring seamless communication and
        notification delivery to stakeholders.
      </p>
      <p>
        My experience includes developing and maintaining custom plugins for <span className={styles.highlight}>e-commerce platforms</span> like nopCommerce, with a track record of enhancing
        functionalities such as integrating payment systems like PayU. I am
        adept at <span className={styles.highlight}>database optimization</span> techniques using <span className={styles.highlight}>Entity Framework</span>,
        ensuring efficient data retrieval and enhancing overall application
        performance.
      </p>
      <p>
        I have a strong understanding of <span className={styles.highlight}>software testing</span> methodologies,
        conducting thorough testing and <span className={styles.highlight}>debugging</span> to guarantee accuracy and
        reliability of functionalities. My adaptability and quick learning
        enable me to transition between different projects and technologies
        within short timeframes.
      </p>
      <p>
        With a solid foundation in software development principles and a
        relentless drive for continuous improvement, I am poised to contribute
        effectively to projects and teams, leveraging my skills and abilities to
        drive success and innovation.
      </p>
    </div>
  );
}
