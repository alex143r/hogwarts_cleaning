"use strict";

window.addEventListener("DOMContentLoaded", start);
const allStudents = [];
console.log(allStudents);
const lNameArray = [];
const dupArray = [];

const Student = {
    fName: "",
    lName: "",
    mName: "",
    nName: "",
    img: "",
    house: ""
}

function start() {
    console.log("start");
    loadJSON();
}

function loadJSON() {
    fetch("https://petlatkea.dk/2020/hogwarts/students.json").then(response => response.json()).then(jsonData => {
        prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
    jsonData.forEach(jsonObject => {
        const student = Object.create(Student);
        allStudents.push(student);
        const nameLower = jsonObject.fullname.toLowerCase();
        let studentFull = nameLower.trim();


        const house = jsonObject.house.trim();
        const houseLower = house.toLowerCase();
        if (studentFull.includes("-") == true) {
            capLetters();
        }

        function capLetters() {
            let capLetters = studentFull[0].toUpperCase();
            for (let i = 1; i <= studentFull.length - 1; i++) {
                let currentLetter, previousLetter = studentFull[i - 1];
                if (previousLetter && previousLetter == " " || previousLetter && previousLetter == "-") {
                    currentLetter = studentFull[i].toUpperCase();
                } else {
                    currentLetter = studentFull[i];
                }
                capLetters = capLetters + currentLetter;
            }
            studentFull = capLetters;

        }
        //first name
        student.fName = studentFull.split(' ')[0].substring(0, 1).toUpperCase() + studentFull.split(' ')[0].substring(1);



        //last name
        const lastSpace = studentFull.lastIndexOf(" ");
        student.lName = studentFull.substring(lastSpace + 1, lastSpace + 2).toUpperCase() + studentFull.substring(lastSpace + 2);




        /*let arr = Array.from(studentFull);
        console.log(arr);
        arr.forEach((letter, i) => {
            if (arr[i - 1] === " " || arr[i - 1] === "-") {
                arr[i] = letter.toUpperCase();
            } else {
                arr[i] = letter.toLowerCase();
            }
        })*/


        //middle name + nickname 
        const firstSpace = nameLower.indexOf(" ");
        student.mName = nameLower.substring(firstSpace, lastSpace);


        if (student.mName.includes("\"") == true) {
            student.nName = student.mName.replaceAll("\"", "").trim();
            student.nName = student.nName.substring(0, 1).toUpperCase() + student.nName.substring(1);
            student.mName = "\n";
        } else if (student.mName === "") {
            student.mName = "\n";
        } else {
            student.mName = studentFull.substring(firstSpace + 1, firstSpace + 2).toUpperCase() + studentFull.substring(firstSpace + 2, lastSpace);
        }
        //house
        let houseClean = jsonObject.house.trim();
        student.house = houseClean.substring(0, 1).toUpperCase() + houseClean.substring(1).toLowerCase();

        //img
        if (student.lName.includes("-") == true) {
            let indexHyph = student.lName.indexOf("-");
            student.img = student.lName.substring(indexHyph + 1);
            student.img = student.lName.toLowerCase() + "_" + studentFull.split(' ')[0].substring(0, 1).toLowerCase() + ".png";
        } else {
            student.img = student.lName.toLowerCase() + "_" + studentFull.split(' ')[0].substring(0, 1).toLowerCase() + ".png";
        }



    })



    console.table(allStudents);

    /*checkDup();

    function checkDup(allStudents) {
        for (let i = 0; i < allStudents.length; i++) {
            let value = allStudents.lName[i];
            if (allStudents.indexOf(value) !== -1) {
                return true;
            }
        }

    }
   */




}