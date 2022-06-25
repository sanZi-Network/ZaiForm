// formWorker.js declaration file

// readFormFile
export function readFormFile(formID: string, userID: string): false | {
    id: string,
    title: string,
    action: string,
    author: string,
    fields: [
        {
            id: string,
            name: string,
            description: string,
            type: string,
            required: boolean,
            options: [
                {
                    id: string,
                    name: string
                }
            ],
            value: null | string,
            correctID?: string,
            customize?: {
                customCSS?: string,
                customBackground?: string,
                customBorder?: string,
                customFont?: string
            }
        }
    ],
    userChoice: [
        {
            id: null | string,
            choice: [
                {
                    id: string,
                    value: string
                }
            ]
        }
    ],
    createTimestamp: number,
    updateTimestamp: number,
    enabled: boolean,
    customize?: {
        customCSS?: string,
        customBackground?: string,
        customBorder?: string,
        customFont?: string
    }
}

// readFormDB
export function readFormDB(): [
    {
        id: string,
        author: string,
        title: string,
        createAt: number
    }
]

// createForm
export function createForm(title: string, description: string, action: "regular" | "score", userID: string): false | string;

// updateForm
export function updateForm(formID: string, userID: string, data: {
    title: string,
    action: "regular" | "score",
    fields: [
        {
            id: string,
            name: string,
            description: string,
            type: string,
            required: boolean,
            options: [
                {
                    id: string,
                    name: string
                }
            ],
            value: null | string,
            correctID?: string,
            customize?: {
                customCSS?: string,
                customBackground?: string,
                customBorder?: string,
                customFont?: string
            }
        }
    ],
    enabled: boolean,
    customize?: {
        customCSS?: string,
        customBackground?: string,
        customBorder?: string,
        customFont?: string
    }
}): false | void;

// readFormFields
export function readFormFields(formI: string, userID: string): [
    {
        id: string,
        name: string,
        description: string,
        type: string,
        required: boolean,
        options: [
            {
                id: string,
                name: string
            }
        ],
        value: null | string,
        correctID?: string,
        customize?: {
            customCSS?: string,
            customBackground?: string,
            customBorder?: string,
            customFont?: string
        }
    }
];

// updateFormField
export function updateFormField(formID: string, userID: string, fieldIndex: number, fieldData: {
    id: string,
    name: string,
    description: string,
    type: string,
    required: boolean,
    options: [
        {
            id: string,
            name: string
        }
    ],
    value: null | string,
    correctID?: string
}): false | void;

// deleteForm
export function deleteForm(formID: string, userID: string): boolean | void;

// getForms
export function getForms(userID: string): [
    {
        id: string,
        author: string,
        title: string,
        createAt: number
    }
];
