import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

const jobsToUse = [
  {
    png: 'consultorios.png',
    title: 'Consultorios médicos',
    description: 'Consultorios médicos son profesionales que ofrecen servicios de atención médica a pacientes de todo el mundo. Estos profesionales son especializados en una variedad de temas, desde el diagnóstico y tratamiento de enfermedades crónicas hasta la atención a los pacientes con discapacidades.',
  },
  {
    png: 'talleres.png',
    title: 'Talleres mecánicos',
    description: 'Talleres mecánicos son espacios donde los profesionales de la industria mecánica pueden aprender habilidades y técnicas para mejorar sus habilidades y mejorar la calidad de sus productos.',
  },
  {
    png: 'barberias.png',
    title: 'Salones de belleza y barberías',
    description: 'Los salones de belleza y barberías son espacios donde los profesionales de la industria de belleza y barbería pueden aprender habilidades y técnicas para mejorar sus habilidades y mejorar la calidad de sus productos.',
  },
  {
    png: 'centros-deportivos.svg',
    title: 'Centros deportivos',
    description: 'Los centros deportivos son espacios donde los profesionales de la industria deportiva pueden aprender habilidades y técnicas para mejorar sus habilidades y mejorar la calidad de sus productos.',
  },
  {
    png: 'tattoo-studios.svg',
    title: 'Tattoo studios',
    description: 'Los tattoo studios son espacios donde los profesionales de la industria de tatuajes pueden aprender habilidades y técnicas para mejorar sus habilidades y mejorar la calidad de sus productos.',
  },
  {
    png: 'salones-fiestas.svg',
    title: 'Salones de fiestas y/o eventos',
    description: 'Los salones de fiestas y/o eventos son espacios donde los profesionales de la industria de fiestas y eventos pueden aprender habilidades y técnicas para mejorar sus habilidades y mejorar la calidad de sus productos.',
  },
];

export default function Component() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ fontFamily: 'Montserrat' }}>TUS-TURNOS</h1>
        <nav className={styles.nav}>
          <Link href="/login">
            <button className={styles.button}>Iniciar sesion</button>
          </Link>
        </nav>
      </header>

      <main>
        <section className={styles.mainSection}>
          <h2>Probá Tu sistema de turnos</h2>
          <p>¿Queres organizar la agenda de tu negocio?</p>
          <button className={styles.button}>Contacto</button>
          <br />
          <br />
          <Link href="/demo">
            <button className={styles.button}>Probar demo</button>
          </Link>
        </section>

        <section className={styles.featuresSection}>
          <h2>Mirá algunos de los rubros donde podés usar TUS-TURNOS​</h2>
          <div className={styles.featuresContainer}>
            {jobsToUse.map((job) => (
              <div key={job.png} className={styles.featureItem}>
                <Image src={`/jobs-icons/${job.png}`} alt={job.title} width={100} height={100} />
                <h3>{job.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 @primebit. All rights reserved.</p>
      </footer>
    </div>
  );
}
