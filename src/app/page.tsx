'use client'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { feactcPokemon, feactcTypeList, feactcFilter} from '../redux/action';
import { Button, Typography, Form, Input, Select, Tag, Pagination, Space, Empty} from 'antd';
import { Col, Card, Row } from 'antd';
import { Pokemon, Results } from "@/interface/interface";
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import type { FormInstance } from 'antd/es/form';
import { TypePokenmon } from "@/lib/helper";
import { setCurrent } from '../redux/reducers';
type FieldType = {
  name: string;
  type: number;
};


const tagRender = (props: CustomTagProps) => {
  const { value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={TypePokenmon(value).color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{textTransform: 'capitalize',  marginRight: 3}}
    >
      {value}
    </Tag>
  );
};


export default function Home() {
  const { pokemon, filter, current, count } = useSelector((state: any) => state.pokemon);
  const formRef = useRef<FormInstance>(null);
  const { types } = useSelector((state: any) => state.types)
  const dispatch = useDispatch()
  
  useEffect(() => {
    feactcTypeList()(dispatch); 
    feactcPokemon(current, '', '',pokemon)(dispatch)
  }, []);

  const onChangePage = (current: number) => {
    formRef.current?.resetFields();
    dispatch(setCurrent(current))
    feactcPokemon(current, '', '',pokemon)(dispatch)

  };

  const onFinish = (values: {name: string; type: string;}) => {
    feactcFilter(pokemon, values.name, values.type, current)(dispatch)
  };

  const onReset = () => {
    formRef.current?.resetFields();
    feactcFilter(pokemon, '', '', 0)(dispatch)

  };

  return (
    <>
      <div className="container">
      <Head ><title>My page title</title></Head>
        <Form
          name="fitter"
          layout="vertical"
          ref={formRef}
          onFinish={onFinish}
        >
          <Row align="bottom" gutter={[16, 16]} >
            <Col xs={24} sm={24} md={9} lg={6}>
              <Form.Item<FieldType>
                label="Name"
                name="name"
              >
                <Input placeholder="name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} lg={6}>
              <Form.Item<FieldType> name="type" label="Type">
                <Select
                  placeholder="Select type"
                  style={{ width: '100%' }}
                  tagRender={tagRender}
                  options={types.map((item:Results) => ({
                    value: item.name,
                    label: <Tag 
                            color={TypePokenmon(item.name).color}
                            style={{textTransform: 'capitalize'}}
                          >
                            {item.name}
                          </Tag>,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item >
                <Space>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                  <Button htmlType="button" onClick={()=>{onReset()}}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row gutter={[18, 18]}>
            {
              filter.length > 0 ?
              filter?.map((item:Pokemon, index:number)=> {
                return (   
                  <Col  key={`pokemon_${index}`}  xs={24} sm={12} md={8} lg={6}>
                    <Link href={`/${item.id}`}>
                      <Card 
                        className='card-pokemon' 
                        style={{background: TypePokenmon(item.types[0].type.name).color+'40'}}
                      >
                        <div style={{textAlign: 'center'}}>
                          <Image
                            src={ item.url ? item.url: '/poke_ball.webp'}
                            width={150}
                            height={150}
                            alt=''
                          />
                        </div>
                        <Typography.Title level={3}>{item.name}</Typography.Title>
                        {
                          item.types.map((type, typeIndex)=> {
                          return (  
                              <Tag 
                                key={`type_${typeIndex}`} 
                                color={TypePokenmon(type.type.name).color}
                                style={{textTransform: 'capitalize'}}
                              >
                                {type.type.name}
                              </Tag>
                            )
                          })
                        }
                      </Card> 
                    </Link>   
                  </Col>
                )
              })
              :  
              <Col xs={24} >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
               </Col>
            }
        </Row>
        <div style={{textAlign: 'center', padding: '24px 0px'}}>
          <Pagination 
            total={count} 
            pageSize={20} 
            showSizeChanger={false}
            current={current}
            onChange={(e)=>{onChangePage(e)}}
          />
        </div>
      </div>
    </>
  )
}
