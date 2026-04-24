import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPageData(lang: string = 'es') {
    const isEs = lang === 'es';

    return {
      lang,
      isEs,
      meta: {
        title: 'Fundación Santuario Clafira',
        description: isEs
          ? 'Más de 170 animales de 14 especies distintas encuentran paz, amor y libertad en Limache, Chile.'
          : 'Over 170 rescued animals from 14 different species find peace, love and freedom in Limache, Chile.',
      },
      nav: {
        links: isEs
          ? ['Inicio', 'Nosotros', 'Habitantes', 'Donar', 'Voluntariado']
          : ['Home', 'About', 'Residents', 'Donate', 'Volunteer'],
        hrefs: ['#inicio', '#nosotros', '#animales', '#donar', '#voluntariado'],
        cta: isEs ? 'Donar ahora' : 'Donate now',
        langToggle: isEs ? 'EN' : 'ES',
        langHref: isEs ? '/?lang=en' : '/?lang=es',
      },
      hero: {
        badge: 'Limache, Valparaíso · Chile',
        headline: isEs
          ? 'Cada vida merece ser vivida con dignidad.'
          : 'Every life deserves to be lived with dignity.',
        sub: isEs
          ? 'Más de 170 animales de 14 especies distintas encuentran paz, amor y libertad en Limache, Chile.'
          : 'Over 170 rescued animals from 14 different species find peace, love and freedom in Limache, Chile.',
        cta1: isEs ? 'Conoce el santuario' : 'Meet the sanctuary',
        cta2: isEs ? 'Apoya nuestra misión' : 'Support our mission',
        stats: [
          { num: '170+', label: isEs ? 'Habitantes' : 'Residents' },
          { num: '2012', label: isEs ? 'Fundación' : 'Founded' },
          { num: '14', label: isEs ? 'Especies' : 'Species' },
          { num: '100%', label: isEs ? 'Compasión' : 'Compassion' },
        ],
        lastRescue: {
          name: isEs ? '🐴 Frida, la yegua' : '🐴 Frida, the mare',
          time: isEs ? '4 años en el santuario' : '4 years at the sanctuary',
        },
      },
      about: {
        sectionLabel: isEs ? 'Sobre nosotros' : 'About us',
        title: isEs
          ? 'Nacimos del amor por los que no tienen voz'
          : 'We were born from love for those without a voice',
        p1: isEs
          ? 'Fundación Santuario Clafira nació con una convicción simple: los animales de granja merecen vivir. Ubicados en Limache, en la Región de Valparaíso, somos un refugio para vacas, cerdos, gallinas, cabras, caballos, ciervos y muchos más que llegaron a nuestras manos después de años de sufrimiento.'
          : 'Fundación Santuario Clafira was born with a simple conviction: farm animals deserve to live. Located in Limache, in the Valparaíso Region, we are a refuge for cows, pigs, chickens, goats, horses, deer and many more who came to us after years of suffering.',
        p2: isEs
          ? 'Hoy somos hogar de más de 170 habitantes que tienen nombre, historia y personalidad. Cada uno de ellos nos recuerda por qué hacemos esto cada mañana.'
          : 'Today we are home to over 170 residents who have names, stories and personalities. Each one of them reminds us why we do this every morning.',
        values: isEs
          ? [
              { title: 'Rescate', desc: 'Actuamos ante el sufrimiento animal, siempre.' },
              { title: 'Educación', desc: 'Promovemos la empatía hacia todas las especies.' },
              { title: 'Comunidad', desc: 'Construimos juntos un mundo más compasivo.' },
            ]
          : [
              { title: 'Rescue', desc: 'We act against animal suffering, always.' },
              { title: 'Education', desc: 'We promote empathy toward all species.' },
              { title: 'Community', desc: 'Together we build a more compassionate world.' },
            ],
      },
      animals: {
        sectionLabel: isEs ? 'Los habitantes' : 'Our residents',
        title: isEs
          ? 'Conoce a algunos de nuestros habitantes'
          : 'Meet some of our residents',
        sub: isEs
          ? 'Cada uno tiene nombre, historia y una personalidad única. Son la razón de cada día.'
          : 'Each one has a name, a story and a unique personality. They are the reason for every day.',
        ctaMore: isEs ? 'Ver más habitantes ↓' : 'See more residents ↓',
        ctaLess: isEs ? 'Ver menos ↑' : 'See less ↑',
        ctaSponsor: isEs ? 'Apadrina un habitante →' : 'Sponsor a resident →',
        featured: [
          {
            id: 1,
            name: 'Valentina',
            species: isEs ? 'Vaca' : 'Cow',
            image: '/images/animales/animal-valentina.jpg',
            story: isEs
              ? 'Valentina llegó al santuario después de escapar de un matadero. Hoy, sus mejores amigos son los humanos que la cuidan cada día.'
              : 'Valentina arrived at the sanctuary after escaping a slaughterhouse. Today, her best friends are the humans who care for her every day.',
          },
          {
            id: 2,
            name: 'Copete',
            species: isEs ? 'Cerdo' : 'Pig',
            image: '/images/animales/animal-copete.jpg',
            story: isEs
              ? 'Copete fue rescatado de una granja industrial. Ahora pasa sus días jugando en el barro y tomando siestas al sol.'
              : 'Copete was rescued from an industrial farm. He now spends his days playing in the mud and napping in the sun.',
          },
          {
            id: 3,
            name: 'Palomita',
            species: isEs ? 'Gallina' : 'Chicken',
            image: '/images/animales/animal-palomita.jpg',
            story: isEs
              ? 'Palomita nunca había pisado tierra hasta que llegó a Clafira. Hoy explora el patio con curiosidad infinita.'
              : 'Palomita had never touched ground until she arrived at Clafira. Today she explores the yard with infinite curiosity.',
          },
          {
            id: 4,
            name: 'Cósimo',
            species: isEs ? 'Cabro' : 'Goat',
            image: '/images/animales/animal-cosimo.jpg',
            story: isEs
              ? 'Cósimo es el más travieso del santuario. Escapa de cualquier corral y siempre encuentra la manera de meterse en problemas.'
              : 'Cósimo is the most mischievous in the sanctuary. He escapes any pen and always finds a way to get into trouble.',
          },
          {
            id: 5,
            name: 'Frida',
            species: isEs ? 'Yegua' : 'Mare',
            image: '/images/animales/animal-frida.jpg',
            story: isEs
              ? 'Frida llegó desnutrida y asustada. Hoy galopa libre por los potreros y tiene más energía que nadie.'
              : 'Frida arrived malnourished and scared. Today she gallops freely through the paddocks and has more energy than anyone.',
          },
          {
            id: 6,
            name: 'Bambi',
            species: isEs ? 'Cierva' : 'Deer',
            image: '/images/animales/animal-bambi.jpg',
            story: isEs
              ? 'Bambi fue encontrada herida en el campo. Su recuperación fue un milagro y hoy es el alma del santuario.'
              : 'Bambi was found injured in the field. Her recovery was a miracle and today she is the soul of the sanctuary.',
          },
        ],
        extra: [
          {
            id: 7,
            name: 'Coco',
            species: isEs ? 'Burro' : 'Donkey',
            image: '/images/animales/animal-burro.jpg',
            story: isEs
              ? 'Coco llegó recién nacido junto a su madre. Creció en el santuario y hoy es el más cariñoso del lugar.'
              : 'Coco arrived newborn alongside his mother. He grew up at the sanctuary and today he is the most affectionate of all.',
          },
          {
            id: 8,
            name: 'Crush',
            species: isEs ? 'Perro' : 'Dog',
            image: '/images/animales/animal-perro.jpg',
            story: isEs
              ? 'Crush llegó al santuario asustada y flaca. Hoy es la guardiana más fiel del refugio.'
              : 'Crush arrived at the sanctuary scared and thin. Today she is the most loyal guardian of the refuge.',
          },
          {
            id: 9,
            name: 'Mochi',
            species: isEs ? 'Gata' : 'Cat',
            image: '/images/animales/animal-gato.jpg',
            story: isEs
              ? 'Mochi apareció un día sin avisar y decidió quedarse. Ahora reina sobre todos los habitantes.'
              : 'Mochi showed up one day unannounced and decided to stay. Now she reigns over all the residents.',
          },
        ],
      },
      donate: {
        sectionLabel: isEs ? 'Haz la diferencia' : 'Make a difference',
        title: isEs
          ? 'Tu aporte alimenta vidas reales'
          : 'Your contribution feeds real lives',
        sub: isEs
          ? 'Con tu donación mensual ayudas a cubrir la alimentación, veterinaria y cuidado de más de 170 animales de 14 especies que encontraron en Clafira su segundo hogar.'
          : 'With your monthly donation you help cover food, veterinary care and the upkeep of over 170 animals from 14 species who found their second home at Clafira.',
        impacts: [
          { amount: '$5.000/mes', label: isEs ? 'Alimenta a Palomita 1 mes' : 'Feeds Palomita 1 month' },
          { amount: '$10.000/mes', label: isEs ? 'Cuida a Cósimo' : 'Takes care of Cósimo' },
        ],
        freqLabels: isEs ? ['Mensual', 'Única vez'] : ['Monthly', 'One time'],
        presets: [2000, 5000, 10000, 20000],
        amountLabel: isEs ? 'Elige un monto (CLP)' : 'Choose an amount (CLP)',
        freqLabel: isEs ? '¿Con qué frecuencia?' : 'How often?',
        customPlaceholder: isEs ? 'Otro monto...' : 'Other amount...',
        btnText: isEs ? 'Donar ahora' : 'Donate now',
        secure: isEs ? 'Pago seguro · Cancela cuando quieras' : 'Secure payment · Cancel anytime',
      },
      volunteer: {
        sectionLabel: isEs ? 'Únete' : 'Join us',
        title: isEs ? 'Sé parte del cambio' : 'Be part of the change',
        sub: isEs
          ? '¡Síguenos en nuestras redes sociales para enterarte de las próximas jornadas de voluntariado en el santuario. Te esperamos con los brazos (y patas) abiertos!'
          : 'Follow us on social media to find out about upcoming volunteer days at the sanctuary. We can\'t wait to meet you!',
        socials: [
          { name: 'Instagram', handle: '@santuarioclafira', href: 'https://www.instagram.com/santuarioclafira/', icon: 'instagram' },
          { name: 'Facebook', handle: 'Santuario Clafira', href: '#', icon: 'facebook' },
          { name: 'TikTok', handle: '@santuarioclafira', href: '#', icon: 'tiktok' },
        ],
      },
      footer: {
        location: 'Limache, Región de Valparaíso, Chile',
        instagram: 'https://www.instagram.com/santuarioclafira/',
        handle: '@santuarioclafira',
        copyright: isEs ? 'Todos los derechos reservados' : 'All rights reserved',
        year: 2026,
      },
    };
  }
}
