import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { reportId, newStatus } = req.body;

  if (!reportId || !newStatus) {
    return res.status(400).json({ message: "Missing required fields: reportId and newStatus" });
  }

  const validStatuses = ["Submitted", "Pending", "Solving", "Solved"];
  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(", ")}` });
  }

  try {
    const updatedReport = await prisma.report.update({
      where: {
        id: parseInt(reportId, 100),
      },
      data: {
        status: newStatus,
      },
    });

    return res.status(200).json({
      message: "Report status updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    return res.status(500).json({ message: "Failed to update report status", error: error.message });
  }
}
