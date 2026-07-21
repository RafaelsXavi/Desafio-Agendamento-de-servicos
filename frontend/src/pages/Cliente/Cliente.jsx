import React from 'react';
import './Cliente.css';

const whatsappLink = 'https://wa.me/5511999999999';

const services = [
  {
    title: 'Corte clássico',
    description: 'Um corte bem executado, alinhado ao seu estilo e à sua rotina.',
  },
  {
    title: 'Barba completa',
    description: 'Acabamento preciso para valorizar os traços do seu rosto.',
  },
  {
    title: 'Corte + barba',
    description: 'Uma experiência completa para sair pronto para qualquer ocasião.',
  },
];

const WhatsAppButton = ({ children, className = 'prime-button' }) => (
  <a className={className} href={whatsappLink} target="_blank" rel="noreferrer">
    {children}
    <span aria-hidden="true">→</span>
  </a>
);

const Cliente = () => (
  <div className="prime-page">
    <header className="prime-header" aria-label="Header da Barbearia Prime">
      <a className="prime-logo" href="#inicio" aria-label="Barbearia Prime, início">
        <span className="logo-mark" aria-hidden="true">P</span>
        <span>Barbearia <strong>Prime</strong></span>
      </a>

      <nav className="prime-nav" aria-label="Navegação principal">
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </nav>

      <WhatsAppButton className="header-cta">Agendar horário</WhatsAppButton>
    </header>

    <main>
      <section className="prime-hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="eyebrow">Cotia · São Paulo</p>
          <h1 id="hero-title">O seu estilo merece <em>precisão.</em></h1>
          <p className="hero-copy">Cortes e barbas com atenção aos detalhes, em um ambiente feito para você desacelerar.</p>
          <div className="hero-actions">
            <WhatsAppButton>Falar no WhatsApp</WhatsAppButton>
            <a className="text-link" href="#servicos">Conhecer serviços <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />
          <div className="hero-monogram">BP</div>
          <p>ESTILO · CUIDADO · PRESENÇA</p>
        </div>
      </section>

      <section className="prime-section services-section" id="servicos" aria-labelledby="services-title">
        <div className="section-heading">
          <p className="eyebrow">Nossos cuidados</p>
          <h2 id="services-title">Serviços que respeitam a sua identidade.</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span className="service-number">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="service-link">
                Agendar este serviço <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="prime-section about-section" id="sobre" aria-labelledby="about-title">
        <div className="about-art" aria-hidden="true"><span>PRIME</span></div>
        <div className="about-content">
          <p className="eyebrow">Nossa essência</p>
          <h2 id="about-title">Mais que um corte. Um momento seu.</h2>
          <p>Na Barbearia Prime, cada atendimento começa ouvindo o que você procura. Nosso foco é unir técnica, conversa e cuidado para que você saia se reconhecendo no espelho.</p>
          <p>Estamos em Cotia para tornar a rotina de autocuidado mais simples, elegante e próxima.</p>
          <WhatsAppButton className="prime-button prime-button-outline">Conversar com a equipe</WhatsAppButton>
        </div>
      </section>

      <section className="final-cta" id="contato" aria-labelledby="cta-title">
        <p className="eyebrow">CTA final</p>
        <h2 id="cta-title">Seu próximo visual começa aqui.</h2>
        <p>Escolha o melhor horário e fale diretamente com a nossa equipe.</p>
        <WhatsAppButton>Agendar pelo WhatsApp</WhatsAppButton>
      </section>
    </main>

    <footer className="prime-footer" aria-label="Footer">
      <a className="prime-logo" href="#inicio" aria-label="Voltar ao início">
        <span className="logo-mark" aria-hidden="true">P</span>
        <span>Barbearia <strong>Prime</strong></span>
      </a>
      <p>Cotia, São Paulo</p>
      <a href={whatsappLink} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
    </footer>
  </div>
);

export default Cliente;
