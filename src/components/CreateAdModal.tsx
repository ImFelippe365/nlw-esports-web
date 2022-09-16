import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDoubleDown, CaretDown, Check, GameController, CaretDoubleUp } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from './Form/Input';
// import "keen-slider/keen-slider.min.css"
import axios from 'axios';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);

    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
    const [gameSelected, setGameSelected] = useState<string>();

    useEffect(() => {
        axios.get('http://localhost:3333/games')
            .then(({ data }) => setGames(data))
    }, [])

    const handleCreateAd = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        try {
            axios.post(`http://localhost:3333/games/${gameSelected}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert("Anúncio criado com sucesso!")
        } catch (err) {
            alert('Erro ao criar o anúncio!')
            console.log(err)
        }

    }


    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl text-white font-black'>
                    Publique um anúncio
                </Dialog.Title>

                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold' htmlFor='game'>Qual o game?</label>
                        <Select.Root
                            onValueChange={setGameSelected}
                        >
                            <Select.Trigger
                                className='bg-zinc-900 placeholder:text-zinc-500 flex flex-row text-sm items-center justify-between rounded px-4 py-3'
                            >
                                <Select.Value
                                    className='placeholder:text-zinc-500 text-zinc-500'
                                    placeholder="Selecione o game que deseja jogar"
                                />

                                <Select.Icon>
                                    <CaretDown className='w-6 h-6 text-zinc-400' />
                                </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal>
                                <Select.Content className='bg-zinc-900 rounded shadow-2xl shadow-black/35 py-2'>
                                    <Select.ScrollUpButton className='px-3 mt-4 animate-bounce'>
                                        <CaretDoubleUp className='w-4 h-4 text-white' />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport>
                                        <Select.Group>
                                            <Select.Label
                                                className='px-12 pt-4 pb-2 text-zinc-500 text-sm'
                                            >
                                                Jogos disponíveis
                                            </Select.Label>
                                            {
                                                games.map((game) =>
                                                    <Select.Item
                                                        key={game.id}
                                                        value={game.id}
                                                        className='flex flex-row items-center  relative text-violet-500 rounded px-4 py-3 pl-12 cursor-default hover:bg-violet-500 hover:text-white hover:font-bold text-sm'
                                                    >
                                                        <Select.ItemIndicator className='absolute left-4 flex items-center justify-center'>
                                                            <Check className='w-5 h-5' />
                                                        </Select.ItemIndicator>
                                                        <Select.ItemText>
                                                            {game.title}
                                                        </Select.ItemText>
                                                    </Select.Item>
                                                )
                                            }
                                        </Select.Group>
                                    </Select.Viewport>
                                    <Select.ScrollDownButton>
                                        <CaretDoubleDown className='w-4 h-4 text-white' />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name'>Seu nome (ou nickname)</label>
                        <Input name='name' id='name' type="text" placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO!' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='discord'>Qual seu Discord?</label>
                            <Input name='discord' id='discord' type="text" placeholder='Usuário#0000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='weekDays'>Quando costuma jogar?</label>

                            <ToggleGroup.Root
                                value={weekDays}
                                onValueChange={setWeekDays}
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                            >
                                <ToggleGroup.Item
                                    value={"0"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Domingo'
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value={"1"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Segunda'
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value={"2"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Terça'
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value={"3"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quarta'
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value={"4"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quinta'
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value={"5"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sexta'
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value={"6"}
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sábado'
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>

                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor='hourStart'>Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                                <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex gap-2 items-center text-sm text-white'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className='w-6 h-6 rounded bg-zinc-900 p-1'
                        >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>

                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            type='button'
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600'
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                            type='submit'
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}