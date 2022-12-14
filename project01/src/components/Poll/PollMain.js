import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "antd";
import PollForm from "./PollForm";
import { Link, useParams } from "react-router-dom";
import VoteView from "./VoteView";

import "../../styles/PollMain.css";

const PollMain = ({ team_seq }) => {
  const [allPoll, setAllPoll] = useState([]);
  const [viewPoll, setViewPoll] = useState();
  const [items, setItems] = useState([]);

  const [recentCk, setRecentCk] = useState(true);
  const [formCk, setFormCk] = useState(false);
  const [listCk, setListCk] = useState(true);

  // 지난 투표 목록 테이블 컬럼 지정
  const columns = [
    {
      title: "투표제목",
      dataIndex: "vl_subject",
      render: (_, record) => (
        <div>
          <button
            value={record.vl_seq}
            className="favorBtnStyle"
            onClick={linkPoll}
          >
            {record.vl_subject}
          </button>
        </div>
      ),
    },
    {
      title: "시작일",
      dataIndex: "reg_date",
    },
    {
      title: "종료일",
      dataIndex: "vl_end_dt",
    },
  ];

  // 전체 투표 목록 & 가장 최신 투표 db에서 불러와서 저장
  useEffect(() => {
    let url = `/api/teamroom/${Number(team_seq)}/poll`;
    axios
      .get(url)
      .then((res) => {
        setAllPoll(res.data);
        setViewPoll(res.data[0]);
        setItems(JSON.parse(res.data[0].vl_items));

        console.log(res);
        console.log(res.data);
        console.log(res.data[0]);
      })
      .catch(() => {
        console.log("생성된 투표가 없습니다");
      });
  }, [formCk]);

  // 모달 화면 전환 - 투표 폼 새로 만들 땐 투표 목록 안 보이게
  const handleForm = (pollRs) => {
    setRecentCk(!recentCk);
    setListCk(!listCk);
    setFormCk(!formCk);
  };

  // 하위 -> 상위 컴포넌트 연결, 폼 생성 완료시 투표 목록 보이게 화면 전환
  const highFunction = (e) => {
    console.log(e);
    if (e == false) {
      handleForm();
    }
    console.log(recentCk);
    console.log(listCk);
  };

  //  목록에서 선택한 투표 보여주기
  const linkPoll = (e) => {
    let vl_seq = e.target.value;
    let url = `/api/teamroom/${team_seq}/poll/${vl_seq}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data); //정상 통신 후 응답된 메시지 출력
        setViewPoll(res.data);
        setItems(JSON.parse(res.data.vl_items));
        console.log(items);
      })
      .catch((error) => {
        console.log(error); //오류발생시 실행
      });
  };

  return (
    <div>
      {/* 가장 최신 투표 출력*/}
      {recentCk && viewPoll && (
        <VoteView team_seq={team_seq} poll={viewPoll} item={items}></VoteView>
      )}
      {viewPoll && console.log(viewPoll)}
      {viewPoll && console.log(viewPoll.vl_subject)}

      {/* 전체 투표 리스트*/}
      {listCk && allPoll && (
        <Table
          columns={columns}
          dataSource={allPoll}
          size="small"
          pagination={{
            pageSize: 2,
          }}
        />
      )}

      {/* 만들어진 투표가 하나도 없을 경우*/}

      {!formCk && (
        <button
          className="pollBtn"
          id="newPollBtn"
          onClick={(e) => handleForm(e)}
        >
          새 투표 만들기
        </button>
      )}

      {formCk && (
        <PollForm propFunction={highFunction} team_seq={team_seq}></PollForm>
      )}
    </div>
  );
};

export default PollMain;
