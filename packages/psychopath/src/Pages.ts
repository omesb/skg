import { Pages } from "./PageTypes";
import { ACTIVITY, ACTIVITY_PARENT, LOG_ENTRY, LOG_ENTRY_ACTIVITY_EXECUTED, LOG_ENTRY_MOOD_FELT, LOG_ENTRY_PERSON_INVOLVED, MOOD, PERSON, PERSON_NAME } from "./Model";

let pages : Pages = {
    "Start": {
        type: "InfoPage",
        label: "Welcome to the PsychoPath!",
        next: "RootMenu"
    },
    "RootMenu": {
        type: "BranchPage",
        label: "How can I help you?",
        transitions: [
            {
                label: "Help, I'm procrastinating!",
                next: "Procrastination"
            },
            {
                label: "Please, let me create semantic diary log entries!",
                next: "CreateLogEntry"
            }
        ]
    },
    "Procrastination": {
        type: "YesNoPage",
        label: "So you are lazy... Do you want to change that?",
        yes: "NYI",
        no: "StayLazy"
    },
    "StayLazy": {
        type: "InfoPage",
        label: "Good choice! We don't have to be productive all of the time! Zzzzzz... Want to start over?",
        next: "Start"
    },
    "NYI": {
        type: "InfoPage",
        label: "Not Yet Implemented! Let's see if Omes can help. :-) See you later!",
        next: "Start"
    },
    "CreateLogEntry": {
        type: "SelectOrCreatePage",
        label: "You can add semantic diary log entries here! Click the Create button....",
        selectPropertyName: null, // Nothing to select, not creating...
        selectOrCreateType: LOG_ENTRY,
        create: "CreateLogEntry1",
        next: "Start"
    },
    "CreateLogEntry1": {
        type: "SelectOrCreatePage",
        label: "What did you do?",
        selectPropertyName: LOG_ENTRY_ACTIVITY_EXECUTED,
        selectOrCreateType: ACTIVITY,
        create: null, // TODO Activity Editor
        next: "CreateLogEntry2"
    },
    "CreateLogEntry2": {
        type: "SelectOrCreatePage",
        label: "How did you feel?",
        selectPropertyName: LOG_ENTRY_MOOD_FELT,
        selectOrCreateType: MOOD,
        create: null, // TODO Mood Editor
        next: "CreateLogEntry3"
    },
    "CreateLogEntry3": {
        type: "SelectOrCreatePage",
        label: "Who was with you?",
        selectPropertyName: LOG_ENTRY_PERSON_INVOLVED,
        selectOrCreateType: PERSON,
        create: "CreatePerson1",
        next: null // Done creating Log entry
    },
    "CreatePerson1": {
        type: "InputPage",
        label: "Creating a Person... Enter the Person's name!",
        inputPropertyName: PERSON_NAME,
        next: null // Done creating Person
    }
}

export default pages;
