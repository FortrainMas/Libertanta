function MultiLang(lang, word){
    const translation = {
        'ru':{
            'Name':'Имя',
            'Surname':'Фамилия',
            'Born date':'Дата рождения',
            'Language':'Язык',
            'State':'Штат',
            'Open key':'Открытый ключ',
            'Password':'Пароль'
        },
        'lt':{
            'Name':'Nomen',
            'Surname': 'Cognomen',
            'Born date': 'Natus diem',
            'Language': 'Lingua',
            'State': 'Civitas',
            'Open key':'Key aperire',
            'Password':'Password'
        },
        'gn':{
            'Name':'Name',
            'Surname': 'Nachname',
            'Born date': 'Geburtsdatum',
            'Language': 'Schprache',
            'State': 'Zustand',
            'Open key':'Schlüssel öffnen',
            'Password':'Passwort'
        }
    }
    const langArr = translation[lang]
    if(langArr) return langArr[word]
    return word;
}

function getLang(lang){
    switch(lang){
        case "Русский":
            return 'ru';
        case "Latinam":
            return 'lt';
        case "English":
            return 'en';
        case 'Deutsch':
            return 'gn'
    }
}

module.exports = {
    MultiLang,
    getLang
}