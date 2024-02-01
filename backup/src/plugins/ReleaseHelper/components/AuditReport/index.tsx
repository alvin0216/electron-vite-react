import { Badge, Descriptions } from "antd";
import { memo } from "react";
import ReactJson from "react-json-view";

interface AuditReportProps {
  auditReportJson: AuditReportJson;
}

const AuditReport: React.FC<AuditReportProps> = memo(({ auditReportJson }) => {
  const { total, critical, high, moderate, low } =
    auditReportJson.metadata.vulnerabilities;

  return (
    <div>
      <div className="mb-26">
        Founded{" "}
        <span className={total === 0 ? "c-green" : "c-#f00"}>{total}</span>{" "}
        vulnerabilities, ({critical} critical, {high} high, {moderate} moderate,{" "}
        {low} low)
      </div>

      <ReactJson
        name="audit-report"
        enableClipboard={false}
        displayDataTypes={false}
        src={auditReportJson}
        style={{ overflow: "auto" }}
      />
    </div>
  );
});

export default AuditReport;
