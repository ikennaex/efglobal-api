const mongoose  = require('mongoose');
const {Schema, model} = mongoose

const NewAnswersSchema = new Schema(
  {
    name: String,
    email: String,
    phonenumber: String,
    address: String,
    dob: String,
    maritalstatus: String,
    employmentstatus: String,
    occupation: String,
    employername: String,
    jobtitle: String,
    highestqualification: String,
    institution1: String,
    yearsattended1: String,
    course1: String,
    qualification1: String,
    institution2: String,
    yearsattended2: String,
    course2: String,
    qualification2: String,
    institution3: String,
    yearsattended3: String,
    course3: String,
    qualification3: String,
    employerAddress1: String,
    yearsEngaged1: String,
    postHeld1: String,
    employerName2: String,
    employerAddress2: String,
    yearsEngaged2: String,
    postHeld2: String,
    employerName3: String,
    employerAddress3: String,
    yearsEngaged3: String,
    postHeld3: String,
    studyLevel: String,
    courseChoice: String,
    preferredCountry: String,
    travelHistory: String,
    denialHistory: String,
    tripBudget: String,
    sponsor: String,
    travelPartner: String,
    travelPartnerList: String,
    sponsorProvide: String,
    proofOfFunds: String,
    howYouHeard: String,
  },
  {
    timestamps: true,
  }
);

const AnswersModel = model("Answer", NewAnswersSchema)

module.exports = AnswersModel