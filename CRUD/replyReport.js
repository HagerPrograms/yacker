const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//If a post/reply is reported 
async function createReplyReport(ip , {content,replyID}){

    console.log("HERE", content, replyID);
    
    const report = await prisma.reply_report.create({
        data: {
          author: ip,
          reply_id: parseInt(replyID),
          report_content: content
        },
      })
    return report;
};

//If reports to a post all seem to be not infracting
async function resolveAll(report){
  const resolve = await prisma.report.updateMany({
      where: {
        threadid:{
            contains: report
        },
      },
      data: {
        resolved: true
      }
    })
};

//Resolve one instance of a report
async function resolveOne(report){
  const resolve = await prisma.report.updateMany({
      where: {
        threadid:{
            contains: report_id
        },
      },
      data: {
        resolved: true
      }
    })
};

//Delete one report
async function deleteReport({report_id}){
  const deleteReport = await prisma.report.delete({
    where:{
      id: report_id
    }
  })
}

//Get all reports

async function getAllReports(){
  const reports = await prisma.report.findMany();
  return reports;
}

//Get all reports for one thread
async function findReports({post_id}){
  const reports = await prisma.report.findMany( {
    where:{
      threadid:{
        includes: post_id
      }
    }
  }
  )
  return reports;
}

//Get one report
async function findReport({report_id}){
  const report = await prisma.report.findUnique(
    {
      where: {
        reportid:{
          includes: report_id
        }
      }
    }
  )
  return report;
}

exports.createReplyReport = createReplyReport;
exports.findReport = findReport;
exports.findReports = findReports;
exports.getAllReports = getAllReports;
exports.deleteReport = deleteReport;
exports.resolveOne = resolveOne;
exports.resolveAll = resolveAll;