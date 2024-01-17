import { FaInstagram } from "react-icons/fa6";
import logoSmall from "../assets/logos/Bildmarke_anthra.svg";

export default function Footer() {
  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content mt-auto">
        <nav>
          <header className="footer-title">Erfahre mehr</header>
          <a className="link link-hover">Therapeutisches Boxen</a>
          <a className="link link-hover">Selbstverteidigung</a>
          <a className="link link-hover">Für Frauen</a>
          <a className="link link-hover">Meditation</a>
          <a className="link link-hover">Team</a>
          <a className="link link-hover">Kontakt</a>
        </nav>
        <nav>
          <header className="footer-title">Rechtliches</header>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/impressum"
          >
            Impressum
          </a>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/datenschutz"
          >
            Datenschutz
          </a>
        </nav>
        <form>
          <header className="footer-title">Newsletter</header>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="footer px-2 py-4 border-t bg-base-200 text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          <img src={logoSmall} className="w-24" />
          <p>© 2023 Artemis Academy, alle Rechte vorbehalten</p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <a
            className="px-6"
            href="https://www.instagram.com/isabella.kravmaga/"
            target="_blank"
          >
            <FaInstagram size={25} />
          </a>
        </nav>
      </footer>
    </>
  );
}
