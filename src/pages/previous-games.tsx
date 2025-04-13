import { PreviousGamesList } from '../components/prev-games-list';

export type Jeopardy = {
    id: string;
    category: string;
    question: string;
    answer: string;
};

export default function Prev_Games() {
    return (
        <>
            <PreviousGamesList />
        </>
    )
}