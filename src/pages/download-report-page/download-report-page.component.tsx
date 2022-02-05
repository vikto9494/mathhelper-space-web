import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import "./download-report-page.styles.scss"
import { CSVLink } from "react-csv";
import { ReportStatisticsEntity } from "../../constructors/common-types";
import NamespaceConstructorRequestHandler
  from "../../constructors/namespace-constructor/namespace-constructor.requests-handler";
import { TaskSetConstructorRequestsHandler }
  from "../../constructors/task-set-constructor/task-set-constructor.requests-handler";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const DownloadReportPage: React.FC = () => {
  // get code from url
  const { entityType } = useParams<{ entityType: any }>();
  const { entityCode } = useParams<{ entityCode: any }>();

  // ref for csv download full report link component
  const csvFullReportLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  // full report data
  const [fullReportData, setFullReportData] = useState<ReportStatisticsEntity[]>([]);

  // ref for csv download full report link component
  const csvDateIntervalLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  // full report data
  const [dateIntervalReportData, setDateIntervalReportData] = useState<ReportStatisticsEntity[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div>
      <div className="download-report-page-header">
        Скачать отчет для {entityType === "namespace" ? "namespace-а" : "набора задач"} с кодом "{entityCode}".
      </div>
      <button
        type="button"
        className="btn download-report-btn"
        onClick={() => {
          if (entityType === "namespace") {
            NamespaceConstructorRequestHandler.getReport(entityCode).then((v: ReportStatisticsEntity[]) => {
              console.log("ReportStatisticsEntity", v);
              setFullReportData(v);
              csvFullReportLinkRef?.current?.link.click();
            });
          } else {
            TaskSetConstructorRequestsHandler.getReport(entityCode).then((v: ReportStatisticsEntity[]) => {
              console.log("ReportStatisticsEntity", v);
              setFullReportData(v);
              csvFullReportLinkRef?.current?.link.click();
            });
          }
        }}
      >
        Скачать полный отчет
      </button>
      <CSVLink
        className="hidden"
        target="_blank"
        data={fullReportData}
        filename={entityType === "namespace" ? `namespace_${entityCode}_report.csv` : `taskset_${entityCode}_report.csv`}
        ref={csvFullReportLinkRef}
      />
      <div className="container">
        <div className="download-report-page-second-header">
          Отчет по интервалу времени
        </div>
        <label htmlFor="start-date-picker" >Выберите начальную и конечную даты</label>
        <div id="start-date-picker">
          <RangePicker
            format="yyyy/MM/dd"
            size="large"
            onChange={(dates, _) => {
              // @ts-ignore
              setEndDate(dates.pop().toDate())
              // @ts-ignore
              setStartDate(dates.pop().toDate())
            }}
          />
        </div>
        <div>
          Вы выбрали интервал с {startDate?.toLocaleDateString()}  до  {endDate?.toLocaleDateString()}
        </div>
        <button
          type="button"
          className="btn download-report-btn"
          onClick={() => {
            if (entityType === "namespace") {
              NamespaceConstructorRequestHandler.getReportByDateInterval(entityCode, startDate, endDate).then((v: ReportStatisticsEntity[]) => {
                console.log("ReportStatisticsEntity", v);
                setDateIntervalReportData(v);
                csvDateIntervalLinkRef?.current?.link.click();
              });
            } else {
              TaskSetConstructorRequestsHandler.getReportByDateInterval(entityCode, startDate, endDate).then((v: ReportStatisticsEntity[]) => {
                console.log("ReportStatisticsEntity", v);
                setDateIntervalReportData(v);
                csvDateIntervalLinkRef?.current?.link.click();
              });
            }
          }}
        >
          Скачать отчет за интервал времени с {startDate?.toLocaleDateString()}  до  {endDate?.toLocaleDateString()}
        </button>
        <CSVLink
          className="hidden"
          target="_blank"
          data={dateIntervalReportData}
          filename={entityType === "namespace" ? `namespace_${entityCode}_date_interval_report.csv` : `taskset_${entityCode}_date_interval_report.csv`}
          ref={csvDateIntervalLinkRef}
        />
      </div>
    </div>
  );
}

export default DownloadReportPage;