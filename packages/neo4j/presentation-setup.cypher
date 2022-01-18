match (n) where (n:Info or n:Decision or n:Factory or n:Type or n:Property or n:Reference) detach delete n;

create
    (Start:Info:Start {name: "Welcome!"}),
    (CreateSemanticDiaryDecision:Decision {name: "Do you want to create a semantic diary entry?"}),
    (SemanticDiaryFactory:Factory {}),
    (Created:Info {name:"Fine! You created an entry! :-)" }),
    (End:Info {name: "End of flow"}),

    (SemanticDiaryEntry:Type {name:"SemanticDiaryEntry"}),
    (SemanticDiaryEntry_comment:Property {name:"comment"}),
    (SemanticDiaryEntry_with:Reference {name:"with"}),
    (SemanticDiaryEntry_feeling:Reference {name:"feeling"}),

    (Person:Type {name:"Person"}),
    (Person_name:Property {name:"name"}),

    (Mood:Type {name:"Mood"}),
    (Mood_name:Property {name:"name"}),

    (Start) -[:NEXT]-> (CreateSemanticDiaryDecision),
    (CreateSemanticDiaryDecision) -[:YES]-> (SemanticDiaryFactory),
    (CreateSemanticDiaryDecision) -[:NO]-> (End),
    (SemanticDiaryFactory) -[:ONCREATED]-> (Created),
    (SemanticDiaryFactory) -[:ONABORTED]-> (End),
    (SemanticDiaryFactory) -[:CREATES]-> (SemanticDiaryEntry),
    (Created) -[:NEXT]-> (CreateSemanticDiaryDecision),

    (SemanticDiaryEntry) -[:HAS]-> (SemanticDiaryEntry_comment),
    (SemanticDiaryEntry) -[:HAS]-> (SemanticDiaryEntry_with),
    (SemanticDiaryEntry) -[:HAS]-> (SemanticDiaryEntry_feeling),
    (SemanticDiaryEntry_with) -[:REFERENCES]-> (Person),
    (SemanticDiaryEntry_feeling) -[:REFERENCES]-> (Mood),
    (Person) -[:HAS]-> (Person_name),
    (Mood) -[:HAS]-> (Mood_name),
    (End) -[:NEXT]-> (Start);