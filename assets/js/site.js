/* ===================================================================
   CHACARA VISTA PANORAMICA  |  Script unico das duas paginas
   =================================================================== */
(function(){
  "use strict";

  var WHATS = '5519994013782';
  var $  = function(s, ctx){ return (ctx || document).querySelector(s); };
  var $$ = function(s, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ---- Ano no rodape ---- */
  var ano = $('#ano');
  if(ano) ano.textContent = new Date().getFullYear();

  /* ---- Nav ---- */
  var nav = $('#nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('solid', window.scrollY > 60); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    var burger = $('#burger'), menu = $('#menu');
    if(burger){
      burger.addEventListener('click', function(){
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    if(menu){
      menu.addEventListener('click', function(e){
        if(e.target.closest('a')){
          nav.classList.remove('open');
          if(burger) burger.setAttribute('aria-expanded','false');
        }
      });
    }
  }

  /* ---- Reveal ---- */
  var revelar = $$('.rv');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.1, rootMargin:'0px 0px -50px 0px'});
    revelar.forEach(function(el){ io.observe(el); });
  } else {
    revelar.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---- Faixa de comodidades ---- */
  var icones = {
    piscina:'<path d="M2 16c1.5 0 1.5 1.2 3 1.2S6.5 16 8 16s1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2"/><path d="M2 20c1.5 0 1.5 1.2 3 1.2S6.5 20 8 20s1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2"/><path d="M6 16V5a2 2 0 014 0M14 16V5a2 2 0 014 0"/>',
    montanha:'<path d="M2 19l6.5-8.5L13 16l3.2-4.2L22 19z"/><circle cx="7" cy="6" r="2.4"/>',
    vale:'<path d="M3 18l5-9 4 6 3-4 6 7z"/><path d="M3 21h18"/>',
    cozinha:'<path d="M4 21V8h16v13z"/><path d="M4 12h16"/><path d="M8 8V5a4 4 0 018 0v3"/>',
    wifi:'<path d="M5 12.5a10 10 0 0114 0"/><path d="M8.5 16a5.5 5.5 0 017 0"/><path d="M2 9a15 15 0 0120 0"/><circle cx="12" cy="19.5" r="1"/>',
    tv:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    carro:'<path d="M5 17h14l-1.6-5.2A3 3 0 0014.5 10h-5a3 3 0 00-2.9 1.8z"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="16.5" cy="17.5" r="2"/><path d="M9 10V7h6v3"/>',
    pet:'<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M12 11c-3 0-5 2.5-5 5.5S9 21 12 21s5-1.5 5-4.5S15 11 12 11z"/>',
    rancho:'<path d="M4 20V9l8-5 8 5v11z"/><path d="M9 20v-7h6v7"/>',
    fogo:'<path d="M12 22c4 0 7-2.7 7-6.5C19 11 12 2 12 2S5 11 5 15.5C5 19.3 8 22 12 22z"/>',
    geladeira:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 11h12"/><path d="M9 6.5v1M9 15v1"/>',
    sinuca:'<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="8" cy="10" r="1"/><circle cx="16" cy="14" r="1"/><path d="M6 15l4-4"/>',
    ventilador:'<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C12 6 13.8 4 16 4s2 4-4 5.8M14.2 12c3.8 0 5.8 1.8 5.8 4s-4 2-5.8-4M12 14.2c0 3.8-1.8 5.8-4 5.8s-2-4 4-5.8M9.8 12C6 12 4 10.2 4 8s4-2 5.8 4"/>',
    cerca:'<path d="M3 20h18"/><path d="M6 20V7l2-3 2 3v13M14 20V7l2-3 2 3v13"/><path d="M4 11h16M4 15h16"/>',
    estrada:'<path d="M7 3L4 21M17 3l3 18"/><path d="M12 4v3M12 10.5v3M12 17v3"/>',
    sofa:'<path d="M4 18h16"/><path d="M6 18v-7a2 2 0 012-2h8a2 2 0 012 2v7"/><path d="M4 14a2 2 0 014 0M16 14a2 2 0 014 0"/>'
  };
  var listasFaixa = {
    1:[['piscina','Piscina com deck'],['montanha','Vista para as montanhas'],['vale','Vista para o vale'],
       ['cozinha','Cozinha super completa'],['wifi','Wi-Fi'],['tv','TV'],
       ['carro','Estacionamento gratuito'],['pet','Permitido animais']],
    2:[['rancho','Rancho com churrasqueira'],['fogo','Forno e fogão a lenha'],['geladeira','2 geladeiras e freezer'],
       ['sinuca','Mesa de sinuca'],['ventilador','Ventilador em todos os quartos'],['cerca','Terreno alambrado'],
       ['estrada','Acesso asfaltado'],['sofa','Sala com 2 sofás e sofá-cama']]
  };
  $$('.faixa-track').forEach(function(track){
    var itens = listasFaixa[track.getAttribute('data-faixa')] || [];
    track.innerHTML = itens.map(function(it){
      return '<span class="pill"><svg viewBox="0 0 24 24">' + icones[it[0]] + '</svg><span>' + it[1] + '</span></span>';
    }).join('');
  });

  /* ---- Faixa de beneficios (abaixo do hero) ---- */
  var beneficios = ['10 hóspedes','3 quartos','5 camas','2 banheiros','2.000 m² de terreno',
                    'Piscina com vista para o vale','Deck do pôr do sol','Rancho com churrasqueira',
                    'Forno e fogão a lenha','Mesa de sinuca','Cozinha completa','Wi-Fi',
                    'Estacionamento amplo','Asfalto até a porteira','Pet friendly'];
  $$('.benef-track').forEach(function(track){
    track.innerHTML = beneficios.map(function(b){ return '<span>' + b + '</span>'; }).join('');
  });

  /* ---- Faixa do pomar ---- */
  var frutas = ['Limão','Abacate','Caqui','Pitaya','Romã','Maracujá','Amora','Pitanga','Goiaba',
                'Uva','Mandioca','Banana','Ameixa','Maçã','Castanha','Manga'];
  $$('.pomar-track').forEach(function(track){
    track.innerHTML = frutas.map(function(f){ return '<span>' + f + '</span>'; }).join('');
  });

  /* ---- Carrossel de avaliacoes ---- */
  var avaliacoes = [
    ['Luciane', 5, 'junho de 2026', 'A casa é muito aconchegante. Espaço externo perfeito com uma vista maravilhosa. A área gourmet é completa. Ficamos extasiados com a vista para o pôr do sol. A Bruna é muito simpática e atenciosa. Amamos nossa estadia e pretendemos voltar em breve.'],
    ['Bianca', 5, 'Avaliação recente', 'A chácara é surreal de linda, toda rústica, estava limpa e cheirosa, a paisagem é de tirar o fôlego. Tivemos privacidade ao som dos pássaros e, à noite, aquele barulhinho da cachoeira. O espaço é exatamente igual às fotos, pessoalmente é mais linda ainda. Check-in e checkout flexíveis, muitas atrações por perto.'],
    ['Rapha', 4, 'maio de 2026', 'Nossa estadia foi muito boa, a casa é muito boa, conforme o anúncio.'],
    ['Francielle', 5, 'maio de 2026', 'Adoramos! A vista é incrível. Tudo limpo, organizado e muito bonito. Ótimo para passar com família e amigos, recomendo. A Bruna, muito gentil e atenciosa.'],
    ['Gustavo', 5, 'abril de 2026', 'Anfitriã muito atenciosa, localização da casa muito boa e vista do pôr do sol incrível. Ambiente limpo e aconchegante.'],
    ['Marcio', 5, 'janeiro de 2026', 'Fizemos a viagem em família e todos adoraram a acomodação. Lugar tranquilo, de fácil acesso, tudo muito limpo e organizado. A comunicação com a Bruna foi rápida e clara. A vista é incrível em qualquer horário. Tudo perfeito!'],
    ['Monica', 4, 'fevereiro de 2026', 'A vista da casa é maravilhosa.'],
    ['Ana Cristina', 5, 'janeiro de 2026', 'Chácara muito gostosa! Correspondeu às expectativas, passamos uma semana maravilhosa. A Bruna é uma pessoa simpaticíssima, sempre muito atenciosa e prestativa. Super indico!'],
    ['Ana', 5, 'dezembro de 2025', 'Passamos dias maravilhosos e noites extraordinárias, as estrelas iluminam o céu. Muito obrigada, Bruna, por tudo. Amamos a experiência!'],
    ['Rafael', 5, 'novembro de 2025', 'Lugar espetacular, processo super tranquilo. Foi uma excelente estadia! Voltaremos com certeza.'],
    ['Emanuelle', 4, 'junho de 2025', 'Casa muito bonita, região muito boa. Obrigada!'],
    ['Luiza Aparecida', 5, 'junho de 2025', 'Casa excelente! Lugar limpo, confortável e quentinho. Bruna e o Sr. Fernando são excelentes anfitriões, gentis, prestativos e simpáticos. Foi um excelente final de semana, voltaremos com certeza.'],
    ['Tadeu', 5, 'maio de 2025', 'Espaço extremamente agradável, a vista é linda. A anfitriã Bruna foi extremamente atenciosa.'],
    ['Renato', 5, 'abril de 2025', 'Anfitriã muito prestativa e atenciosa, sempre disposta a sanar as dúvidas. Casa com uma vista fantástica das montanhas e do vale. Recomendo para quem busca paz e tranquilidade.'],
    ['Bruna', 5, 'março de 2025', 'Lugar maravilhoso, com uma vista incrível! A casa é perfeita, aconchegante, com tudo o que precisamos, zero defeitos. Com certeza voltarei mais vezes. A anfitriã é um amor e bem flexível em todos os quesitos.'],
    ['Vinicius', 5, 'março de 2025', 'Tudo ótimo, vista magnífica das montanhas, localizado próximo de bons restaurantes e atrações turísticas. Bruna e Fernando, pessoas muito gentis.'],
    ['Leonardo', 5, 'fevereiro de 2025', 'A casa está em um lugar lindo, cercada pela natureza e com uma vista deslumbrante. A piscina estava impecável, bem cuidada, foi um dos destaques da estadia. A casa é bem equipada, com cozinha completa e banheiros limpos. O atendimento foi muito atencioso.'],
    ['Jessica', 5, 'fevereiro de 2025', 'Experiência maravilhosa! A Bruna é muito atenciosa e seu pai também, ambos nos receberam com muita educação e gentileza. O local é espetacular, paisagem incrível.'],
    ['Silvio', 5, 'janeiro de 2025', 'O espaço é exatamente como o anunciado, excelente localização, vista espetacular e uma excelente piscina. A casa é rústica, porém aconchegante. Na área externa tem churrasqueira, fogão e forno a lenha. Bruna e seu pai Fernando nos recepcionaram de modo excepcional.'],
    ['Fernando', 5, 'janeiro de 2025', 'Tivemos uma ótima estadia no final de ano. Tudo organizado e boa estrutura. A vista é espetacular. Anfitriões simpáticos e atenciosos!'],
    ['Laís', 5, 'novembro de 2024', 'Bruna e seu pai foram extremamente receptivos conosco. O espaço é lindo, com uma vista deslumbrante, de fácil acesso, asfaltado até a porta e próximo aos principais restaurantes da cidade. Excelente para descanso e lazer com a família!'],
    ['Jonathan', 5, 'dezembro de 2024', 'A vista foi a melhor, a casa é linda e a Bruna, super atenciosa.']
  ];

  function estrelasHtml(n){
    var svg = '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>';
    return '<div class="stars">' + new Array(n + 1).join(svg) + '</div>';
  }
  function cardHtml(a){
    return '<article class="r-card">' +
             '<span class="r-av">' + a[0].charAt(0) + '</span>' +
             '<div class="r-corpo">' +
               '<div class="r-topo"><b>' + a[0] + '</b>' + estrelasHtml(a[1]) + '<small>' + a[2] + '</small></div>' +
               '<p>' + a[3] + '</p>' +
             '</div>' +
           '</article>';
  }
  var trilhos = $$('.r-track');
  if(trilhos.length){
    var metade = Math.ceil(avaliacoes.length / 2);
    var blocos = { 1: avaliacoes.slice(0, metade), 2: avaliacoes.slice(metade) };
    trilhos.forEach(function(track){
      var lista = blocos[track.getAttribute('data-linha')] || [];
      track.innerHTML = lista.map(cardHtml).join('');
    });
  }

  /* ---- Barras de nota ---- */
  var bars = $$('.bar i');
  if(bars.length){
    if('IntersectionObserver' in window){
      var ioBar = new IntersectionObserver(function(ents){
        ents.forEach(function(en){
          if(en.isIntersecting){
            en.target.style.width = en.target.getAttribute('data-w') + '%';
            ioBar.unobserve(en.target);
          }
        });
      }, {threshold:.4});
      bars.forEach(function(b){ ioBar.observe(b); });
    } else {
      bars.forEach(function(b){ b.style.width = b.getAttribute('data-w') + '%'; });
    }
  }

  /* ---- Carrosseis de categoria da galeria ---- */
  $$('[data-car]').forEach(function(car){
    var trilho = $('.car-trilho', car),
        slides = $$('.car-slide', car),
        prev = $('.car-prev', car),
        next = $('.car-next', car),
        pontos = $('.car-pontos', car),
        contador = $('.car-contador', car),
        i = 0;

    if(slides.length < 2){
      if(prev) prev.style.display = 'none';
      if(next) next.style.display = 'none';
      if(pontos) pontos.style.display = 'none';
    }

    slides.forEach(function(_, n){
      var p = document.createElement('button');
      p.type = 'button';
      p.setAttribute('aria-label', 'Ir para a foto ' + (n + 1));
      p.addEventListener('click', function(){ ir(n); });
      pontos.appendChild(p);
    });

    function ir(n){
      i = Math.max(0, Math.min(n, slides.length - 1));
      trilho.style.transform = 'translateX(' + (-i * 100) + '%)';
      $$('button', pontos).forEach(function(p, n2){ p.classList.toggle('ativo', n2 === i); });
      contador.textContent = (i + 1) + ' de ' + slides.length;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      if(car.id){
        $$('[data-alvo="' + car.id + '"]').forEach(function(b){
          b.classList.toggle('ativo', parseInt(b.getAttribute('data-ir'), 10) === i);
        });
      }
    }
    car.irPara = ir;

    prev.addEventListener('click', function(){ ir(i - 1); });
    next.addEventListener('click', function(){ ir(i + 1); });

    /* arrastar com o dedo no celular */
    var x0 = null;
    car.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
    car.addEventListener('touchend', function(e){
      if(x0 === null) return;
      var d = e.changedTouches[0].clientX - x0;
      if(Math.abs(d) > 45) ir(d < 0 ? i + 1 : i - 1);
      x0 = null;
    }, {passive:true});

    ir(0);
  });

  /* ---- Lista lateral controlando um carrossel ---- */
  $$('[data-alvo][data-ir]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var alvo = document.getElementById(btn.getAttribute('data-alvo'));
      if(alvo && alvo.irPara) alvo.irPara(parseInt(btn.getAttribute('data-ir'), 10));
    });
  });

  /* ---- Lightbox da galeria ---- */
  var lb = $('#lb');
  if(lb){
    var figuras = $$('.car-slide');
    var fotos = figuras.map(function(fig){
      var img = fig.querySelector('img');
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt') };
    });
    var lbImg = $('#lbImg'), lbCap = $('#lbCap'), atual = 0;

    var mostrar = function(i){
      atual = (i + fotos.length) % fotos.length;
      lbImg.src = fotos[atual].src;
      lbImg.alt = fotos[atual].alt;
      lbCap.textContent = (atual + 1) + ' de ' + fotos.length;
    };
    var abrirLb = function(i){ mostrar(i); lb.classList.add('on'); document.body.style.overflow = 'hidden'; };
    var fecharLb = function(){ lb.classList.remove('on'); document.body.style.overflow = ''; };

    figuras.forEach(function(fig, i){ fig.addEventListener('click', function(){ abrirLb(i); }); });
    $('#lbClose').addEventListener('click', fecharLb);
    $('#lbPrev').addEventListener('click', function(e){ e.stopPropagation(); mostrar(atual - 1); });
    $('#lbNext').addEventListener('click', function(e){ e.stopPropagation(); mostrar(atual + 1); });
    lb.addEventListener('click', function(e){ if(e.target === lb) fecharLb(); });
    document.addEventListener('keydown', function(e){
      if(!lb.classList.contains('on')) return;
      if(e.key === 'Escape') fecharLb();
      if(e.key === 'ArrowLeft') mostrar(atual - 1);
      if(e.key === 'ArrowRight') mostrar(atual + 1);
    });
  }

  /* ---- Acordeao de FAQ ---- */
  var faqs = $$('.faq-item');
  function abrirFaq(item){
    faqs.forEach(function(o){ o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; });
    item.classList.add('open');
    var a = item.querySelector('.faq-a');
    a.style.maxHeight = a.scrollHeight + 'px';
  }
  faqs.forEach(function(item){
    item.querySelector('.faq-q').addEventListener('click', function(){
      if(item.classList.contains('open')){
        item.classList.remove('open');
        item.querySelector('.faq-a').style.maxHeight = null;
      } else { abrirFaq(item); }
    });
  });

  /* ---- Modais ---- */
  var modais = {};
  var mReserva = $('#modalReserva'), mFaq = $('#modalFaq');
  if(mReserva) modais.reserva = mReserva;
  if(mFaq) modais.faq = mFaq;

  function fecharModais(){
    Object.keys(modais).forEach(function(k){ modais[k].classList.remove('on'); });
    document.body.style.overflow = '';
  }
  function abrirModal(nome, extra){
    var m = modais[nome];
    if(!m) return;
    fecharModais();
    m.classList.add('on');
    document.body.style.overflow = 'hidden';
    if(nome === 'faq'){
      faqs.forEach(function(o){ o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; });
      var i = extra === null || extra === undefined ? -1 : parseInt(extra, 10);
      if(i >= 0 && faqs[i]) setTimeout(function(){ abrirFaq(faqs[i]); }, 70);
    }
    if(nome === 'reserva') setTimeout(atualizaPrevia, 10);
  }

  document.addEventListener('click', function(e){
    var abre = e.target.closest('[data-modal]');
    if(abre){ e.preventDefault(); abrirModal(abre.getAttribute('data-modal'), abre.getAttribute('data-faq')); return; }
    if(e.target.closest('[data-fechar]')){ fecharModais(); return; }
    if(e.target.classList.contains('modal')) fecharModais();
  });
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    var algumAberto = Object.keys(modais).some(function(k){ return modais[k].classList.contains('on'); });
    if(algumAberto) fecharModais();
  });

  /* ---- Formulario de reserva ---- */
  var form = $('#formReserva');
  function atualizaPrevia(){}

  if(form){
    var previa = $('#previaTexto'),
        cIn = $('#rIn'), cOut = $('#rOut'), cNome = $('#rNome'), cObs = $('#rObs');

    var hoje = new Date().toISOString().split('T')[0];
    cIn.min = hoje; cOut.min = hoje;
    cIn.addEventListener('change', function(){
      cOut.min = cIn.value || hoje;
      if(cOut.value && cOut.value < cIn.value) cOut.value = '';
      atualizaPrevia();
    });

    var dataBr = function(v){
      if(!v) return '';
      var p = v.split('-');
      return p[2] + '/' + p[1] + '/' + p[0];
    };
    var marcado = function(nome){
      var el = form.querySelector('input[name="' + nome + '"]:checked');
      return el ? el.value : '';
    };
    var montaMensagem = function(){
      var l = ['Olá! Vim pelo site da Chácara Vista Panorâmica.', ''];
      l.push('Gostaria de consultar disponibilidade e valores.');

      var ini = dataBr(cIn.value), fim = dataBr(cOut.value);
      if(ini && fim) l.push('Check-in: ' + ini + ' | Check-out: ' + fim);
      else if(ini) l.push('Check-in: ' + ini);
      else if(fim) l.push('Check-out: ' + fim);

      var h = marcado('hospedes');
      if(h) l.push('Somos ' + h + (h === '1' ? ' hóspede.' : ' hóspedes.'));

      var perfil = marcado('perfil');
      if(perfil) l.push('Perfil da estadia: ' + perfil + '.');

      var nome = cNome.value.trim();
      if(nome) l.push('Meu nome é ' + nome + '.');

      var obs = cObs.value.trim();
      if(obs) l.push('Observação: ' + obs);

      return l.join('\n');
    };

    atualizaPrevia = function(){ previa.textContent = montaMensagem(); };
    form.addEventListener('input', atualizaPrevia);
    form.addEventListener('change', atualizaPrevia);
    atualizaPrevia();

    form.addEventListener('submit', function(e){
      e.preventDefault();
      window.open('https://wa.me/' + WHATS + '?text=' + encodeURIComponent(montaMensagem()), '_blank', 'noopener');
    });
  }
})();
