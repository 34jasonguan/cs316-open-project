import prisma from "../../../lib/prisma";

export default async function handler(req, res) {

  const { reportId, newStatus, message } = req.body;

  if (!reportId || !newStatus) {
    return res.status(400).json({
      message: "Missing required fields: reportId and newStatus",
    });
  }

  const validStatuses = ["Submitted", "Pending", "Solving", "Solved"];
  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({
      message: `Invalid status. Valid statuses are: ${validStatuses.join(", ")}`,
    });
  }

  try {
    const report = await prisma.report.findUnique({
      where: { id: parseInt(reportId, 10) },
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const currentMessages = report.messages ? JSON.parse(report.messages) : [];
    const timestamp = new Date().toISOString();

    if (message) {
      currentMessages.push({
        sender: "RA", 
        content: message,
        timestamp,
      });
    }

    const updatedReport = await prisma.report.update({
      where: {
        id: parseInt(reportId, 10),
      },
      data: {
        status: newStatus,
        messages: JSON.stringify(currentMessages), 
      },
    });

    return res.status(200).json({
      message: "Report status and message updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    return res.status(500).json({
      message: "Failed to update report status",
      error: error.message,
    });
  }
}
