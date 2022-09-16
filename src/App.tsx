import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import { useState, useEffect } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { CaretLeft, CaretRight, GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { CreateAdModal } from './components/CreateAdModal';

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export default function App() {

  const [games, setGames] = useState<Game[]>([]);

  const [ref, slideRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6,
      spacing: 24,
    },
    rubberband: false,
    mode: 'free-snap',
    dragSpeed: 2,
  })

  const hasSlideRef = slideRef?.current?.track.details ? slideRef?.current?.track.details.progress : false;

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => setGames(data))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center m-20'>
      <img src={logoImg} alt='' />

      <h1 className='text-6xl text-white font-black m-20'>
        Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui
      </h1>


      <div ref={ref} className="relative keen-slider">
        {
          games.map((game) =>
            <GameBanner
              key={game.id}
              title={game.title}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}

            />)
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
