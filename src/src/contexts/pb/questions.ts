// @ts-ignore
import CardsThin from "@/assets/card-icons/flashcards.svg?react";
// @ts-ignore
import Matching from "@/assets/card-icons/matching.svg?react";
// @ts-ignore
import MultipleChoice from "@/assets/card-icons/multiple-choice.svg?react";
// @ts-ignore
import Input from "@/assets/card-icons/input.svg?react";

import { Question } from "@/contexts/pb/types";
import { QuestionType } from "@/contexts/pb/types";


const questions: Question[] = [
    {
        type: QuestionType.Flashcard,
        icon: CardsThin,
        disabled: false,
        info: "This is a flashcard question. You can use it to create a question with a single answer.",
    }, 
    {
        type: QuestionType.Input,
        icon: Input,
        disabled: true,
        info: "This is an input question. You can use it to create a question with a single answer.",
    },
    {
        type: QuestionType.MultipleChoice,
        icon: MultipleChoice,
        disabled: true,
        info: "This is a multiple-choice question. You can use it to create a question with multiple answers.",
    },
    {
        type: QuestionType.Matching,
        icon: Matching,
        disabled: true,
        info: "This is a matching question. You can use it to create a question with multiple pairs of answers.",
    },
];

export { questions };