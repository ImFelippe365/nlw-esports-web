interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner({ title, adsCount, bannerUrl }: GameBannerProps) {
    return (
        <a href='' className='relative rounded-lg overflow-hidden hover:translate-y-[-1rem] transition-all keen-slider__slide number-slide1'>
            <img src={bannerUrl} alt='' />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white'>{title}</strong>
                <span className='text-zinc-300 text-sm block'>{adsCount} anúncio(s)</span>
            </div>
        </a>
    );
}