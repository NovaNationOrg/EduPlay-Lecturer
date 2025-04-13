import { useLiveQuery } from "dexie-react-hooks"
import { JSX, useEffect, useState } from "react"
import { db } from "../database/db";
import { JeopardyGame } from "../database/interfaces/jeopardy";
import leftArrow from "../../assets/images/jeopardy/left-arrow.png";
import rightArrow from "../../assets/images/jeopardy/right-arrow.png";

export default function ListData() {

    const [currentPage, setCurrentPage] = useState<number>(Number(sessionStorage.getItem("review-page")) || 1);
    const [category, setCategory] = useState<JeopardyGame | undefined>(undefined);

    const jpLists: JeopardyGame[][] = [[]]
    let categoryData: JeopardyGame[] | undefined
    const game_id = localStorage.getItem("_jp_game_id")!
    for (let i = 0; i <= 5; i++) {
        const num = i + 1

        categoryData = useLiveQuery(() =>
            db.jeopardyData.where("[game_id+category_num]").equals([game_id, num]).toArray()
        );

        if (categoryData != undefined)
            jpLists[i] = categoryData
    }

    const incrementCurrentPage = () => {
        const nextPage = currentPage === 7 ? 1 : currentPage + 1;
        sessionStorage.setItem("review-page", nextPage.toString());
        setCurrentPage(nextPage);
        setCategory(jpLists[currentPage - 1]?.[currentPage])
    };

    const decrementCurrentPage = () => {
        const prevPage = currentPage === 1 ? 6 : currentPage - 1;
        sessionStorage.setItem("review-page", prevPage.toString());
        setCurrentPage(prevPage);
        setCategory(jpLists[currentPage - 1]?.[currentPage])
    };

    useEffect(() => {
        if (categoryData && categoryData.length > 0) {
            setCategory(jpLists[currentPage - 1]?.[0]);
        }
    }, [categoryData, currentPage, jpLists]);

    let paginationArrow: JSX.Element = <></>
    let textElement: JSX.Element[] = []

    const jeopardyGameData = useLiveQuery(() =>
        category
            ? db.jeopardyData.where("theme").equals(String(category.theme)).toArray() as Promise<JeopardyGame[]>
            : Promise.resolve([] as JeopardyGame[]),
        [category]
    ) || [];

    const questions = jeopardyGameData?.map((record) => record.question);
    const answers = jeopardyGameData?.map((record) => record.answer);

    if (currentPage === 1) {
        paginationArrow =
            <div className="page-arrow">
                <div className="empty-arrow"></div>
                <img className="right-arrow" src={rightArrow} alt="right-arrow" onClick={incrementCurrentPage} />
            </div>
    }
    else
        if (currentPage === 6) {
            paginationArrow =
                <div className="page-arrow">
                    <img className="left-arrow" src={leftArrow} alt="left-arrow" onClick={decrementCurrentPage} />
                </div>
        }
        else {
            paginationArrow =
                <div className="page-arrow">
                    <img className="left-arrow" src={leftArrow} alt="left-arrow" onClick={decrementCurrentPage} />
                    <img className="right-arrow" src={rightArrow} alt="right-arrow" onClick={incrementCurrentPage} />
                </div>
        }

    textElement = questions?.map((question, i) =>
        <>
            <div key={question + i} className="question-answer-block">
                <header className="header-block">{i + 1}</header>
                <div className="question-answer-text">
                    <div className="underline-text">
                        <header className="text-block">{question}</header>
                        <header className="text-block-tag">QUESTION</header>
                    </div>
                    <div className="underline-text">
                        <header className="text-block">{answers?.[i]}</header>
                        <header className="text-block-tag">ANSWER</header>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            <div className="review-category-name">{category?.theme}</div>
            {textElement}
            {paginationArrow}
        </>
    )
}