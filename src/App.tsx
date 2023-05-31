import "./App.css";
import React from "react";
import LabelInput from "./elements/LabelInput";
import Button from "./elements/Button";
// import { MemoryRouter as Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MemoryRouter, Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
// const fs = window.require("fs");

//функция возвращает правильный формат даты

const formatDate = (date: number) => {
    let t = {
        day:
            new Date(date).getDate() > 9
                ? new Date(date).getDate()
                : "0" + new Date(date).getDate(),
        month:
            new Date(date).getMonth() + 1 > 9
                ? new Date(date).getMonth() + 1
                : "0" + (new Date(date).getMonth() + 1),
        year: new Date(date).getFullYear(),

        hours:
            new Date(date).getHours() > 9
                ? new Date(date).getHours()
                : "0" + new Date(date).getHours(),
        minutes:
            new Date(date).getMinutes() > 9
                ? new Date(date).getMinutes()
                : "0" + new Date(date).getMinutes(),
        seconds:
            new Date(date).getSeconds() > 9
                ? new Date(date).getSeconds()
                : "0" + new Date(date).getSeconds(),
    };

    let result =
        t.day + "." + t.month + "." + t.year + ", " + t.hours + ":" + t.minutes + ":" + t.seconds;

    return result;
};

const patchWithOffsetTimezone = (time: number) => {
    let offset = new Date().getTimezoneOffset();
    let result = time + offset * 60000;
    return result;
};

const patchWithOffsetTimezone_Reverse = (time: number) => {
    let offset = new Date().getTimezoneOffset();
    let result = time - offset * 60000;
    return result;
};

const countPassedDays = (from: number) => {
    // let to = new Date().getTime();
    let to = patchWithOffsetTimezone(new Date().getTime());
    let difference = to - from;
    let time = {
        years: 0,
        days: 0,
        hours: 0,
    };

    time.years = Math.floor(difference / 31536000000);
    difference = difference - time.years * 31536000000;
    time.days = Math.floor(difference / 86400000);
    difference = difference - time.days * 86400000;
    time.hours = Math.floor(difference / 3600000);
    console.log("years:", time.years, "days:", time.days);

    let result =
        (time.years > 0 ? time.years + " years" : "") +
        (time.years > 0 && (time.days > 0 || time.hours > 0) ? ", " : "") +
        (time.days > 0 ? time.days + " days" : "") +
        (time.days && time.hours > 0 ? ", " : "") +
        (time.hours > 0 ? time.hours + " hours" : "") +
        (time.years == 0 && time.days == 0 && time.hours == 0 ? "0 hours" : "");
    return result;
};

const countPassedSeconds = (from: number) => {
    let to = patchWithOffsetTimezone(new Date().getTime());
    let difference = to - from;
    let time = {
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    time.years = Math.floor(difference / 31536000000);
    difference = difference - time.years * 31536000000;
    time.days = Math.floor(difference / 86400000);
    difference = difference - time.days * 86400000;
    time.hours = Math.floor(difference / 3600000);
    difference = difference - time.hours * 3600000;
    time.minutes = Math.floor(difference / 60000);
    difference = difference - time.minutes * 60000;
    time.seconds = Math.floor(difference / 1000);

    let result =
        (time.years > 0 ? time.years + " years" : "") +
        (time.years > 0 && (time.days > 0 || time.hours > 0 || time.minutes > 0 || time.seconds > 0)
            ? ", "
            : "") +
        (time.days > 0 ? time.days + " days" : "") +
        (time.days > 0 && (time.hours > 0 || time.minutes > 0 || time.seconds > 0) ? ", " : "") +
        (time.days || time.years ? "\n" : "") +
        (time.hours > 0 ? time.hours + " hours" : "") +
        (time.hours > 0 && (time.minutes > 0 || time.seconds > 0) ? ", " : "") +
        (time.minutes > 0 ? time.minutes + " minutes" : "") +
        (time.minutes > 0 && time.seconds > 0 ? ", " : "") +
        (time.seconds > 0 ? time.seconds + " seconds" : "") +
        (time.years == 0 &&
        time.days == 0 &&
        time.hours == 0 &&
        time.minutes == 0 &&
        time.seconds == 0
            ? "0 seconds"
            : "");
    return result;
};

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AddictionTimers = () => {
    const [currentTime, setCurrentTime] = React.useState("");
    const [newAddictionTitle, setNewAddictionTitle] = React.useState("");
    const [addictionsList, setAddictionsList] = React.useState([
        {
            id: 0,
            title: "Не пью алкоголь",
            from: 1648220180,
            desc: "",
        },
    ]);

    const formatDateFromStringToUnix = (date: string) => {
        console.log(date);
        let t = {
            day: Number(date.slice(0, 2)),
            month: Number(date.slice(3, 5)) - 1,
            year: Number(date.slice(6, 10)),
            hours: Number(date.slice(12, 14)),
            minutes: Number(date.slice(15, 17)),
            seconds: Number(date.slice(18, 20)),
        };

        let res = new Date(t.year, t.month, t.day, t.hours, t.minutes, t.seconds).getTime();
        console.log(res);
        return res;
    };

    const reboot = () => {
        setCurrentTime("");
        setNewAddictionTitle("");
    };

    const knowTime_func = () => {
        let now = new Date().getTime();
        let r = formatDate(now);
        setCurrentTime(r);
    };

    const addNewAddiction = () => {
        let timeRegexp = /^\d{2}\.\d{2}\.\d{4}\,\ \d{2}\:\d{2}\:\d{2}$/;
        if (timeRegexp.test(currentTime) && newAddictionTitle) {
            let newItem = {
                id: random(0, 1000000000),
                title: newAddictionTitle,
                from: patchWithOffsetTimezone(formatDateFromStringToUnix(currentTime)),
                desc: "(Вы можете добавлять заметки)",
            };
            setAddictionsList((old) => [...old, newItem]);
            reboot();
        }
    };

    const deleteAddiction = (id: number) => {
        let newList = JSON.parse(JSON.stringify(addictionsList)).filter((f: any) => f.id != id);
        setAddictionsList(newList);
    };

    const [editingAdictionId, setEditingAdictionId] = React.useState<number | null>(null);
    const [editingAdictionLabel, setEditingAdictionLabel] = React.useState<string>("");
    const [editingAdictionDescription, setEditingAdictionDescription] = React.useState<string>("");

    const changeAddiction = (
        id: number,
        title: string = "Новое название",
        desc: string = "Заметка"
    ) => {
        setEditingAdictionId(id);
        setEditingAdictionLabel(title);
        setEditingAdictionDescription(desc);
    };

    const saveEditableAddiction = (id: number) => {
        console.log("Я пытаюсь сохранить зависимость с идентификатором", id);
        let newList = JSON.parse(JSON.stringify(addictionsList)).map((item: any) =>
            item.id === id
                ? {
                      id: item.id,
                      title: editingAdictionLabel == "" ? "Новое название" : editingAdictionLabel,
                      from: item.from,
                      desc: editingAdictionDescription,
                  }
                : item
        );
        console.log("new array is:", newList);
        setAddictionsList(newList);
        setEditingAdictionId(null);
    };

    let basicAddictions = [
        {
            id: 0,
            title: "Не пью алкоголь",
            from: 1648220180,
            desc: "",
        },
    ];
    const [timer, setTimer] = React.useState<number>(0);

    React.useEffect(() => {
        //1 создать файл в localstorage если его нет
        if (localStorage.getItem("data")) {
            let data = JSON.stringify(localStorage.getItem("data"));
            setAddictionsList(JSON.parse(JSON.parse(data)));
        } else {
            localStorage.setItem("data", JSON.stringify(basicAddictions));
            setAddictionsList(basicAddictions);
        }
        setInterval(() => setTimer((time) => time + 1), 1000);
    }, []);

    React.useEffect(() => {
        // fs.writeFileSync("data/addictions.json", JSON.stringify(addictionsList));
        localStorage.setItem("data", JSON.stringify(addictionsList));
    }, [addictionsList]);

    return (
        <div className="main_wrap">
            <div className="register_form">
                <LabelInput
                    label="Введите название зависимости..."
                    item={newAddictionTitle}
                    setItem={setNewAddictionTitle}
                />

                <div className="register_form_date">
                    <LabelInput
                        label="Введите дату полного отказа от зависимости..."
                        item={currentTime}
                        setItem={setCurrentTime}
                    />
                    <div className="register_form_date_buttons">
                        <Button onClickFunc={knowTime_func} label={"Сейчас"} />
                        <Button onClickFunc={addNewAddiction} label={"Добавить"} />
                    </div>
                </div>
            </div>

            {addictionsList && (
                <div className="addiction_items_wrap">
                    {addictionsList.map((item) =>
                        item.id === editingAdictionId ? (
                            <AddictionItemEditing
                                item={item}
                                changeAddiction={changeAddiction}
                                setEditingAdictionLabel={setEditingAdictionLabel}
                                editingAdictionLabel={editingAdictionLabel}
                                saveEditableAddiction={saveEditableAddiction}
                                editingAdictionDescription={editingAdictionDescription}
                                setEditingAdictionDescription={setEditingAdictionDescription}
                            />
                        ) : (
                            <AddictionItem
                                item={item}
                                deleteAddiction={deleteAddiction}
                                changeAddiction={changeAddiction}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
};

const AddictionItem = ({ item, deleteAddiction, changeAddiction }: any) => {
    const [modalConfirmOpen, setModalComfirmOpen] = React.useState<boolean>(false);
    return (
        <div className="addiction_item_wrap">
            <div className="addiction_item_title_wrap">
                <p className="addiction_item_title">{item.title}</p>
                <pre className="addiction_item_desc">{item.desc}</pre>
                <div className="addiction_item_buttons">
                    <Button
                        small={true}
                        onClickFunc={() => setModalComfirmOpen(true)}
                        label={"Удалить"}
                    />
                    <Button
                        small={true}
                        onClickFunc={() => changeAddiction(item.id, item.title, item.desc)}
                        label={"Изменить"}
                    />
                </div>
            </div>
            <div className="addiction_item_timers">
                <div className="addiction_item_from">
                    <p className="addiction_item_from_title">From</p>
                    <p>{formatDate(patchWithOffsetTimezone_Reverse(item.from))}</p>
                </div>
                <div className="addiction_item_from">
                    <p className="addiction_item_from_title">Passed</p>
                    <pre>{countPassedSeconds(item.from)}</pre>
                </div>
            </div>

            {modalConfirmOpen && (
                <div className="modalConfirm_wrap">
                    <p className="modalConfirm_title">Удалить?</p>
                    <div className="modalConfirm_buttons">
                        <Button
                            small={true}
                            onClickFunc={() => {
                                deleteAddiction(item.id);
                                setModalComfirmOpen(false);
                            }}
                            label={"Да"}
                        />
                        <Button
                            small={true}
                            onClickFunc={() => setModalComfirmOpen(false)}
                            label={"Нет"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const AddictionItemEditing = ({
    item,
    changeAddiction,
    editingAdictionLabel,
    setEditingAdictionLabel,
    saveEditableAddiction,
    editingAdictionDescription,
    setEditingAdictionDescription,
}: any) => {
    return (
        <div className="addiction_item_wrap">
            <div className="addiction_item_title_wrap">
                {/* <p className="addiction_item_title">{item.title}</p> */}
                {/* <input className="addiction_item_input" type="text" /> */}
                <textarea
                    value={editingAdictionLabel}
                    onChange={(e) => setEditingAdictionLabel(e.target.value)}
                    className="addiction_item_input"
                    placeholder="Введите название..."
                    cols={30}
                    rows={3}
                    maxLength={140}
                ></textarea>
                <textarea
                    value={editingAdictionDescription}
                    onChange={(e) => setEditingAdictionDescription(e.target.value)}
                    className="addiction_item_input"
                    placeholder="Введите Заметку..."
                    cols={30}
                    rows={10}
                    maxLength={340}
                ></textarea>
                <div className="addiction_item_buttons">
                    <Button
                        small={true}
                        onClickFunc={() => saveEditableAddiction(item.id)}
                        label={"Сохранить"}
                    />
                </div>
            </div>
            <div className="addiction_item_timers">
                <div className="addiction_item_from">
                    <p className="addiction_item_from_title">From</p>
                    <p>{formatDate(patchWithOffsetTimezone_Reverse(item.from))}</p>
                </div>
                <div className="addiction_item_from">
                    <p className="addiction_item_from_title">Passed</p>
                    {/* <p>{countPassedDays(item.from)}</p> */}
                    {/* <p>{countPassedSeconds(item.from)}</p> */}
                    <pre>{countPassedSeconds(item.from)}</pre>
                </div>
            </div>
        </div>
    );
};

const addictions = [
    {
        title: "Думскролинг",
        desc: "Зависимость от чтения новостей, когда человек не может остановиться,пропуская через себя всё больше и больше информации.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Думскроллинг",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=думскроллинг",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=думскроллинг",
            },
        ],
    },
    {
        title: "Шопоголизм (Ониомания)",
        desc: "Непреодолимое желание что-либо покупать без необходимости, ради удовольствия от самого процесса покупки.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Ониомания",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Шопоголизм",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Шопоголизм",
            },
        ],
    },
    {
        title: "Онихофагия",
        desc: "Психическое расстройство, выражающееся в навязчивом обкусывании ногтей.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Онихофагия",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Онихофагия",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Онихофагия",
            },
        ],
    },
    {
        title: "Психогенное переедание",
        desc: "Расстройство приёма пищи, представляющее собой чрезмерное употребление еды, приводящее к появлению лишнего веса, и являющееся реакцией на дистресс",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Психогенное_переедание",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Психогенное переедание",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Психогенное переедание",
            },
        ],
    },
    {
        title: "Токсикомания",
        desc: "Совокупность болезненных состояний, характеризующихся влечением и привыканием к приёму лекарственных средств и других веществ, не относимых к наркотическим согласно государственному «списку контролируемых веществ»",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Токсикомания",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Токсикомания",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Токсикомания",
            },
        ],
    },
    {
        title: "Ковыряние в носу",
        desc: "Умеренное ковыряние не рассматривается отклонением от нормы, но чрезмерное увлечение этим занятием может свидетельствовать о психическом расстройстве.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Ковыряние_в_носу",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Ковыряние в носу",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Ковыряние в носу",
            },
        ],
    },
    {
        title: "Алкоголизм",
        desc: "Тяжелое прогрессирующее заболевание, при котором человек становится психологически и физически зависим от алкоголя. Страдающий алкоголизмом испытывает непреодолимую тягу к спиртному и употребляет его в больших количествах, несмотря на отрицательные последствия.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Алкоголизм",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Алкоголизм",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Алкоголизм",
            },
        ],
    },
    {
        title: "Курение",
        desc: "Вдыхание дыма препаратов, с целью насыщения организма содержащимися в них активными веществами путём их возгонки и последующего всасывания в лёгких и дыхательных путях. Как правило, применяется для употребления курительных смесей, обладающих наркотическими свойствами благодаря быстрому поступлению насыщенной психоактивными веществами крови в головной мозг.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Курение",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Курение",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Курение",
            },
        ],
    },
    {
        title: "Наркомания",
        desc: "Состояние, характеризующееся патологическим влечением к употреблению наркотических веществ, сопровождающееся психическими, а иногда и соматическими расстройствами.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Наркомания",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Наркомания",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Наркомания",
            },
        ],
    },
    {
        title: "Жертва моды",
        desc: "Термин обозначающий человека, до крайностей подчиняющегося влияниям моды, тем самым выходя за рамки здравого смысла.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Жертва_моды",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Жертва моды",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Жертва моды",
            },
        ],
    },
    {
        title: "Зависимость от компьютерных игр",
        desc: "Форма психологической зависимости, проявляющаяся в навязчивом увлечении видеоиграми и компьютерными играми. Особенно на развитие игровой зависимости влияет личностный фактор: несформированная или неустойчивая психика, отсутствие навыков самоконтроля, неудовлетворённость реальной жизнью, желание компенсировать нереализованные жизненные потребности делают человека более подверженным развитию зависимости от компьютерных игр.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Зависимость_от_компьютерных_игр",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Зависимость от компьютерных игр",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Зависимость от компьютерных игр",
            },
        ],
    },
    {
        title: "Зависимость от порнографии",
        desc: "Зависимость от порнографии может быть определена как психическое расстройство, или зависимость от порнографии, характеризующаяся навязчивым желанием смотреть, читать и думать о порнографии и теме секса, в результате чего снижается качество жизни личности и/или семьи.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Зависимость_от_порнографии",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Зависимость от порнографии",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Зависимость от порнографии",
            },
        ],
    },
    {
        title: "Зависимость от социальных сетей",
        desc: "Форма поведенческой зависимости, которую можно описать как чрезмерное или неконтролируемое использование социальных медиа, которое сохраняется, несмотря на серьезные негативные последствия для личных, социальных или профессиональных функций. ",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Зависимость_от_социальных_сетей",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Зависимость от социальных сетей",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Зависимость от социальных сетей",
            },
        ],
    },
    {
        title: "Компьютерная зависимость",
        desc: "Это форма поведенческой зависимости, которую можно описать как чрезмерное или неконтролируемое использование компьютера, которое сохраняется, несмотря на серьезные негативные последствия для личных, социальных или профессиональных функций.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Компьютерная_зависимость",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Компьютерная зависимость",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Компьютерная зависимость",
            },
        ],
    },
    {
        title: "Лудомания",
        desc: "Патологическая склонность к азартным играм, заключается в частых повторных эпизодах участия в азартных играх, которые доминируют в жизни человека и ведут к снижению социальных, профессиональных, материальных и семейных ценностей: такой человек не уделяет должного внимания своим обязанностям в этих сферах.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Лудомания",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Лудомания",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Лудомания",
            },
        ],
    },
    {
        title: "Танорексия",
        desc: "Это психологическая зависимость человека от ультрафиолетовых лучей. Эта проблема становится очень актуальной с учётом широкого распространения всевозможных соляриев — от стационарных профессиональных до домашних.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Танорексия",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Танорексия",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Танорексия",
            },
        ],
    },
    {
        title: "Телезависимость",
        desc: "Зависимость от телевизора — заболевание, негативно влияющее на психическое и физическое здоровье как взрослых, так и детей. Телемания указывает на то, что у человека отсутствуют цели, интересы, а реальную жизнь он пытается заменить виртуальной.",
        links: [
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Телезависимость",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Телезависимость",
            },
        ],
    },
    {
        title: "Номофобия (Зависимость от телефона)",
        desc: "Страх остаться без мобильного телефона или вдалеке от него.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Номофобия",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Номофобия",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Номофобия",
            },
        ],
    },
    {
        title: "Трудоголизм",
        desc: "Термин, обозначающий стремление человека чрезмерно трудиться, выходящее за рамки естественного трудолюбия.",
        links: [
            {
                title: "Википедия",
                url: "https://ru.wikipedia.org/wiki/Трудоголизм",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Трудоголизм",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Трудоголизм",
            },
        ],
    },
    {
        title: "Чрезмерная тяга к сладкому",
        desc: "Зависимость от сладкого",
        links: [
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Чрезмерная тяга к сладкому",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Чрезмерная тяга к сладкому",
            },
        ],
    },
    {
        title: "Зависимость от кофе (Кофеинизм)",
        desc: "Синдром психической и физической зависимости от кофеина (в том числе кофеиносодержащих чая и кофе).",
        links: [
            {
                title: "Википедия",
                url: "https://ru.m.wikipedia.org/wiki/Кофеинизм",
            },
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Кофеинизм",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Кофеинизм",
            },
        ],
    },
    {
        title: "Потребление мяса животных, рыбы и птицы",
        desc: "Если вы считаете это вредным вы можете отказаться от мяса.",
        links: [
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Отказаться от мяса животных и птицы",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Отказаться от мяса животных и птицы",
            },
        ],
    },
    {
        title: "Зависимость от мучного и выпечки",
        desc: "Мучные продукты — быстрый и доступный источник энергии, но очень бедный источник витаминов и минералов. Так же в выпечку добавляют много сахара поэтому такие продукты очень калорийные.",
        links: [
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Зависимость от мучного и выпечки",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Зависимость от мучного и выпечки",
            },
            {
                title: "Хорошая статья",
                url: "https://www.oum.ru/literature/zdorovje/pochemu-khochetsya-muchnogo-prichiny-i-profilaktika/",
            },
        ],
    },
    {
        title: "Потребление вредных пищевых добавок",
        desc: "Например MSG Глутамат натрия, вредная и вызывающие привыкание пищевая добавка.",
        links: [
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Потребление вредных пищевых добавок",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Потребление вредных пищевых добавок",
            },
        ],
    },
    {
        title: "Инфозависимость",
        desc: "Неумеренное потребление информации, часто ненужной.",
        links: [
            {
                title: "Яндекс",
                url: "https://yandex.ru/search/?text=Инфозависимость",
            },
            {
                title: "Гугл",
                url: "https://www.google.com/search?q=Инфозависимость",
            },
        ],
    },
];

const AboutAddictions = () => {
    return (
        <div className="about_wrap">
            <div className="about_info">
                <p className="about_title">Про зависимости</p>
                <p className="about_desc">
                    Здесь собраны тяжелые и не очень зависимости, но без спору они все вредные и от
                    них можно и нужно отказаться.
                </p>
                <p className="about_desc">
                    Вы можете в один клик перейти в wiki или в поисковик чтобы найти актуальные
                    статьи на тему данной зависимости.
                </p>
            </div>
            <div className="about_items">
                {addictions.map((item: any) => (
                    <div className="about_item">
                        <p className="about_item_title">{item.title}</p>
                        <p className="about_item_desc">{item.desc}</p>
                        <div className="about_item_links">
                            {item.links.map((link: any) => (
                                <Button label={link.title} url={link.url} small={true} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const badHabbits = [
    {
        title: "Медленное пробуждение",
        desc: "После будильника людишки лежат в кровати 10 минут затем сидят в туалете и тратят 10-15 минут на скроллинг соцсетей или новости, либо играют в игры еще 10 минут. Лучше не тратить время впустую.",
    },

    {
        title: "Регулярное питание в сетях фастфуда",
        desc: "Если питаться только быстрой едой, увеличивается риск диабета, заболеваний сердечно-сосудистой системы, желудочно-кишечного тракта.",
    },

    {
        title: "Привычка обсуждать своё окружение",
        desc: "Тема сплетен актуальна во все времена. Причем сплетничают все и везде: в школе, на работе, на лавочке у подъезда… К счастью, ныне все больше людей приходят к пониманию, что обсуждение и распространение слухов – это вредная привычка, от которой надо избавляться.",
    },

    {
        title: "Сквернословие",
        desc: "«Крепкое» словцо, сказанное на эмоциях в редких случаях не так страшно, как привычка «выражаться» по необходимости и без особой на то причины. Сквернословие отталкивает и создаёт человеку неприглядную репутацию, что не может не сказаться негативно на жизни индивида, обладающего такой привычкой.",
    },

    {
        title: "Привычка врать",
        desc: "Есть такие личности, которые врут просто потому, что им нравится говорить неправду. Патологические лжецы часто и сами теряют границы и уже не разбирают, где находится правда, а где есть ложь.  Наличие такой привычки делает человека отталкивающим для окружающих. Нередко лживость ложится в основу формирования более серьёзных проблем.",
    },

    {
        title: "Привычка собирать/хранить ненужные вещи",
        desc: "Человек захламляет территорию, что создаёт значительный дискомфорт для него и его близких, соседей. Иногда такое пристрастие к собирательству ненужного хлама принимает патологические формы. Дом в такой ситуации может превратиться в натуральную свалку.",
    },

    {
        title: "Плохие манеры за столом",
        desc: "Отрыжка, разговоры с едой во рту, чавканье.",
    },

    {
        title: "Привычка перебивать других во время разговора",
        desc: "Если вы перебиваете знайте, что, прерывая людей вы на них производите отрицательное впечатление.",
    },

    {
        title: "Привычка опаздывать",
        desc: "Привычка опаздывать может повредить репутации и повлиять на отношения с окружающими.",
    },

    {
        title: "Залипание в телефоне во время общения с другими людьми (фаббинг).",
        desc: "Многие уже озабочены влиянием смартфонов на людей, которое не дает людям нормально общаться.",
    },

    {
        title: "Привычка есть с открытым ртом.",
        desc: "Эта привычка может раздражать других людей.",
    },

    {
        title: "Не прикрывать рот, когда чихаешь.",
        desc: "Эта привычка может раздражать других людей.",
    },

    {
        title: "Разговаривать во время просмотра фильма.",
        desc: "Эта привычка может раздражать других людей.",
    },

    {
        title: "Плевать в общественном месте.",
        desc: "Эта привычка может раздражать других людей.",
    },

    {
        title: "Бессмысленный серфинг в интернете.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Просиживание в социальных сетях.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Просмотр бесконечного потока видео на YouTube.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Стремление дочитать до конца книгу, которая совершенно не заходит.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Попытка изменить мнение другого человека.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Хождение по магазинам с целью убить время.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Просмотр телепередач.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Видеоигры.",
        desc: "Эта вредная привычка ворует ваше время.",
    },

    {
        title: "Хроническое недосыпание.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Еда по ночам.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Не прохождение систематического медицинского осмотра.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Не осуществление действий, направленных на защиту от солнца.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Плохая осанка.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Недостаточное употребление воды.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Невнимательное управление автомобилем.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Зацикливание на возникших проблемах.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Слишком долгое прослушивание музыки в наушниках.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Ношение неудобной обуви.",
        desc: "Эта вредная привычка вредит вашему здоровью.",
    },

    {
        title: "Многозадачность.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Не устранение отвлекающих факторов.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Перфекционизм.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Неумение расставлять приоритеты и делегировать полномочия.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Слишком большой список дел.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Трата времени на грезы и мечтания.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Отсутствие автоматизации повторяющихся задач.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Нерешительность.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Ожидание «подходящего» времени для начала работы или откладывание важной задачи до позднего вечера.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Нежелание осваивать новые навыки.",
        desc: "Эта вредная привычка может вредить вашей работоспобности.",
    },

    {
        title: "Привычка поздно ложиться спать.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Слишком много работать и не отдыхать.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Не выполнять обещания.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Не слушать то, что говорят вам ваши собеседники.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Не возвращать вещи, которые вы одолжили во временное пользование.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Спешка.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Уделять слишком много внимания своей внешности.",
        desc: "Это вредная привычка влияет на вашу жизнь.",
    },

    {
        title: "Говорить «Да» всем подряд.",
        desc: "Это вредная привычка связана с заниженной самооценкой.",
    },

    {
        title: "Не защищать свои интересы в принципиальных моментах.",
        desc: "Это вредная привычка связана с заниженной самооценкой.",
    },

    {
        title: "Бояться неудачи.",
        desc: "Это вредная привычка связана с заниженной самооценкой.",
    },

    {
        title: "Принимать конструктивную критику слишком близко к сердцу.",
        desc: "Это вредная привычка связана с заниженной самооценкой.",
    },

    {
        title: "Слишком легко сдаваться.",
        desc: "Это вредная привычка связана с заниженной самооценкой.",
    },

    {
        title: "Привычка забывать имена людей, с которыми вы общаетесь.",
        desc: "Это вредная привычка влияет на коммуникацию с другими людьми.",
    },

    {
        title: "Привычка быть недружелюбно настроенным.",
        desc: "Это вредная привычка влияет на коммуникацию с другими людьми.",
    },

    {
        title: "Привычка забывать, что и кому вы говорили.",
        desc: "Это вредная привычка влияет на коммуникацию с другими людьми.",
    },

    {
        title: "Привычка превращать диалог в свой монолог.",
        desc: "Это вредная привычка влияет на коммуникацию с другими людьми.",
    },

    {
        title: "Привычка постоянно спорить.",
        desc: "Это вредная привычка влияет на коммуникацию с другими людьми.",
    },

    {
        title: "Привычка разбрасывать одежду по квартире.",
        desc: "Это вредная привычка влияет на чистоту и порядок.",
    },

    {
        title: "Привычка сохранение сломанных вещей, чтобы потом, когда-нибудь починить.",
        desc: "Это вредная привычка влияет на чистоту и порядок.",
    },

    {
        title: "Привычка хранить вещи или одежду, которыми вы не пользовались годами.",
        desc: "Это вредная привычка влияет на чистоту и порядок.",
    },

    {
        title: "Привычка покупать вещи, которые вам на самом деле не нужны.",
        desc: "Это вредная привычка влияет на чистоту и порядок.",
    },

    {
        title: "Привычка не мыть посуду.",
        desc: "Это вредная привычка влияет на чистоту и порядок.",
    },

    {
        title: "Привычка превращать свой балкон в складское помещение.",
        desc: "Это вредная привычка влияет на чистоту и порядок.",
    },
];

const AboutBadHabbits = () => {
    return (
        <div className="about_wrap">
            <div className="about_info">
                <p className="about_title">Про плохие привычки</p>
                <p className="about_desc">
                    Здесь собраны разные негативные привычки от которых вы можете принять решение
                    отказаться.
                </p>
            </div>
            <div className="about_items_habits">
                {badHabbits.map((item: any) => (
                    <div className="about_item">
                        <p className="about_item_title">{item.title}</p>
                        <p className="about_item_desc">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Community = () => {
    return (
        <div className="about_wrap">
            <div className="about_info">
                <p className="about_title">Сообщество</p>
                <p className="about_desc">
                    Здесь собраны все ссылки сообщества "StopAddictions app".
                </p>
            </div>
            <div className="about_items_habits">
                <div className="about_item_links">
                    <Button label={"Discord"} url={"https://discord.gg/zKtaTsNYNQ"} />
                </div>
            </div>
        </div>
    );
};

// export default function App() {
//     return (
//         <div className="navbar_wrap">
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<AddictionTimers />} />
//                     <Route path="/aboutAddictions" element={<AboutAddictions />} />
//                     <Route path="/aboutBadHabbits" element={<AboutBadHabbits />} />
//                     <Route path="/community" element={<Community />} />
//                 </Routes>
//                 <div className="navbar">
//                     <Link className="navbar_link" to="/">
//                         Мои таймеры
//                     </Link>
//                     <Link className="navbar_link" to="/aboutAddictions">
//                         Про зависимости
//                     </Link>
//                     <Link className="navbar_link" to="/aboutBadHabbits">
//                         Плохие привычки
//                     </Link>
//                     <Link className="navbar_link" to="/community">
//                         Сообщество
//                     </Link>
//                 </div>
//             </Router>
//         </div>
//     );
// }

export default function App() {
    return (
        <BrowserRouter>
            <div className="navbar_wrap">
                <Routes>
                    <Route path="/" element={<AddictionTimers />} />
                    <Route path="/aboutAddictions" element={<AboutAddictions />} />
                    <Route path="/aboutBadHabbits" element={<AboutBadHabbits />} />
                    <Route path="/community" element={<Community />} />
                </Routes>
                <div className="navbar">
                    <Link className="navbar_link" to="/">
                        Мои таймеры
                    </Link>
                    <Link className="navbar_link" to="/aboutAddictions">
                        Про зависимости
                    </Link>
                    <Link className="navbar_link" to="/aboutBadHabbits">
                        Плохие привычки
                    </Link>
                    <Link className="navbar_link" to="/community">
                        Сообщество
                    </Link>
                </div>
            </div>
        </BrowserRouter>
    );
}

