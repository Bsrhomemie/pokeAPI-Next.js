"use client";
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  Stats, Types} from "@/interface/interface";
import { feactcDetail } from '../../redux/action';
import { Image, Button, Col, Typography, Card, Row, Progress, Divider, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TypePokenmon } from "@/lib/helper";

const colorProgress = [
  '#DE3163', '#FF7F50', '#FFBF00', '#9FE2BF', '#40E0D0', '#6495ED'
]

export default function PokemonDetail({ params }: { params: { id: number } }) {
  const { detail } = useSelector((state: any) => state.pokemon)
  const dispatch = useDispatch()
  useEffect(() => {
    feactcDetail(params.id)(dispatch);
  }, [params.id]);
  console.log(detail);
  return (
    <>
      <div className="container">
        <Button
          onClick={() => window.history.back()}
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
        <Card 
          style={{marginTop: 20}} 
          bodyStyle={{
            boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)'
          }}
        >
           <Image
              width={"40%"}
              src={detail?.sprites?.front_default}
              preview={false}
            />
            <Image
              width={"40%"}
              src={detail?.sprites?.front_default}
              preview={false}
            />
            <Image
              width={"40%"}
              src={detail?.sprites?.front_default}
              preview={false}
            />
          <Row justify="space-between">
            <Col span={18} sm={{ flex: '1 0 100%' }}>
              <Typography.Title level={1}>{detail.name}</Typography.Title>
            </Col>
            <Col flex={'none'}>

             
              <Space wrap>
                {detail?.types?.map((type:Types, typeIndex:number)=> {
                  return (  
                    <div  
                      key={`type_${typeIndex}`} 
                      style={{
                        background: TypePokenmon(type.type.name).color,
                        padding: '5px 15px 5px 10px',
                        borderRadius: 50,
                        fontSize: 16,
                        color: '#ffffff'
                      }}
                    >
                      <Image
                        width={40}
                        src={`type/${type.type.name}.png`}
                        preview={false}
                      />
                      {type.type.name}
                    </div>
                  )
                })}
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row  gutter={[16, 16]}>
            <Col xs={{ order: 2, span: 24}} lg={{ order: 1, span: 10}} >
              <Card>
                <Typography.Title level={5}>Base Stats</Typography.Title>
                {
                  detail.stats?.map((stats:Stats, index:number)=> {
                    return(
                      <div key={`stats${index}`}>
                        <Typography.Text>{stats.stat.name}</Typography.Text>
                        <Progress percent={stats.base_stat} strokeColor={colorProgress[index]} />
                      </div>
                    )
                  })
                }
              </Card>
            </Col>
            <Col xs={{ order: 1, span: 24}} lg={{ order: 2, span: 14}}>
              <div style={{textAlign:'center'}}>
                <Image
                  width="60%"
                  src={detail.url}
                />
                <div className="pokemon-image"></div>
              </div>
          </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}
