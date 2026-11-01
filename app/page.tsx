import ClientBoot from "./client-boot";
export default function Home() {
  return (
    <>
      <a className="skip" href="#desk">
        Ir para a escrivaninha
      </a>
      <header>
        <a href="/" className="wordmark">
          póstera<span>correspondências para depois</span>
        </a>
        <a href="#desk">Escrever uma cápsula ↗</a>
      </header>
      <main>
        <section className="opening">
          <div className="opening-line">
            <span>ENTRE O AGORA</span>
            <span>E O AINDA NÃO.</span>
          </div>
          <h1>
            Nem toda palavra
            <br />é para <em>agora.</em>
          </h1>
          <div className="postal-art" aria-hidden="true">
            <span className="orbit-text">
              GUARDAR · ESPERAR · REENCONTRAR ·
            </span>
            <div className="envelope hero-envelope">
              <div className="sheet">
                Algumas coisas
                <br />
                precisam
                <br />
                <em>de tempo.</em>
                <small>PARA VOCÊ, DEPOIS.</small>
              </div>
              <div className="pocket" />
              <div className="flap" />
              <div className="seal">p</div>
            </div>
            <span className="postmark">
              TEMPO É<br />
              DESTINATÁRIO
            </span>
          </div>
          <p>
            Uma mensagem. Um intervalo.
            <br />A delicadeza de não abrir antes da hora.
          </p>
          <a className="down" href="#desk">
            Desça para escrever ↓
          </a>
        </section>
        <section id="desk">
          <div id="app-root">
            <p>Abrindo a escrivaninha…</p>
          </div>
        </section>
        <section className="paper-story">
          <img
            src="/media/letter.webp"
            width="1400"
            height="933"
            loading="lazy"
            alt="Mãos organizando um envelope e uma folha de papel em branco"
          />
          <div>
            <span>O QUE FICA ENTRE AS LINHAS</span>
            <h2>
              Esperar também
              <br />é uma forma
              <br />
              <em>de cuidar.</em>
            </h2>
            <p>
              Escolha uma mensagem inventada, selecione o papel e dê a ela um
              tempo. Depois de selar, não há edição nem abertura antecipada pela
              experiência.
            </p>
            <p>
              Esta é uma demonstração. O link revela a mensagem após a abertura.
              Não escreva informações pessoais ou segredos.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <strong>póstera</strong>
        <p>Uma experiência de Gustavo Paz.</p>
        <a href="/api-docs.html">O tempo por dentro ↗</a>
        <a href="https://github.com/gustapaz/postera">Código e créditos ↗</a>
        <small>Fotografia: Angela Roma / Pexels.</small>
        <button id="motion-toggle" aria-pressed="false">
          Pausar movimento
        </button>
      </footer>
      <ClientBoot />
    </>
  );
}
