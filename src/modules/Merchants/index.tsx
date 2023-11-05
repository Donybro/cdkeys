import React, { FC, useEffect, useState } from "react";
import useMerchants from "../../hooks/useMerchants";
import MerchantItem from "../../components/UI/MerchantItem";
import {Button, Divider, Form, Input, message, Select, Space} from "antd";
import styles from "./style.module.scss";
import ComparisonCard from "../../components/UI/ComparisonCard";
import apiRequest from "../../shared/utils/api/apiRequest.ts";

const Index: FC = () => {
  const {
    merchantsList,
    merchantPairs,
    addMerchantPair,
    merchantAreAdded,
    merchantAreNotAdded,
    merchantsAreAdding,
    deletePairHandler,
    pairIsDeleting,
    pairIsDeleted,
    pairIsNotDeleted,
    updateComparisonsList,
    updateMerchantsList,
  } = useMerchants();

  const [firstSelectedMerchant, setFirstSelectedMerchant] = useState<any>();
  const [secondSelectedMerchant, setSecondSelectedMerchant] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const [form] = Form.useForm();

  const addNewMerchant = async (values: any) => {
    setIsSubmitting(true);
    const { data } = await apiRequest.post(`/merchants`, {
      ...values,
    });
    if (data?.success) {
      form.resetFields(['name'])
      updateLists()
      message.success("New merchant added");
    }
    setIsSubmitting(false);
  };

  const [selectedPair, setSelectedPair] = useState<any>();

  useEffect(() => {
    if (merchantAreAdded) {
      clearSelectedMerchants();
      message.success("Merchant added!");
      updateLists();
    }
  }, [merchantAreAdded]);

  useEffect(() => {
    if (pairIsDeleted) {
      setSelectedPair("");
      updateLists();
      message.success("Pair deleted!");
    }
  }, [pairIsDeleted]);

  useEffect(() => {
    if (merchantAreNotAdded) {
      message.error("Something get wrong!");
    }
  }, [merchantAreNotAdded]);

  useEffect(() => {
    if (pairIsNotDeleted) {
      message.error("Something get wrong!");
    }
  }, [pairIsNotDeleted]);

  function updateLists() {
    updateComparisonsList((prevState) => prevState + "1");
    updateMerchantsList((prevState) => prevState + "1");
  }

  const onSelectMerchant = (merchant_id: any) => {
    if (!firstSelectedMerchant) {
      setFirstSelectedMerchant(merchant_id);
    } else {
      setSecondSelectedMerchant(merchant_id);
    }
  };

  const clearSelectedMerchants = () => {
    setFirstSelectedMerchant("");
    setSecondSelectedMerchant("");
  };

  const submitMerchants = async () => {
    const payload = {
      merchant_one: firstSelectedMerchant,
      merchant_two: secondSelectedMerchant,
    };
    addMerchantPair(payload);
  };

  const deleteSelectedPair = () => {
    deletePairHandler(selectedPair);
  };

  return (
    <div>
      <h1>List of merchants</h1>
      <div className={styles.merchantsList}>
        {merchantsList.map((merchant) => (
          <div
            className={`${styles.merchant} ${
              firstSelectedMerchant === merchant.merchant_id
                ? styles.selected
                : null
            } ${
              secondSelectedMerchant === merchant.merchant_id
                ? styles.selected
                : null
            }`}
            onClick={() => onSelectMerchant(merchant.merchant_id)}
          >
            <MerchantItem name={merchant.name} logoSlug={merchant.logoSlug} />
          </div>
        ))}
      </div>
      <br />
      <Space size={10}>
        <Button onClick={() => clearSelectedMerchants()}>
          Cancel selected
        </Button>
        <Button
          disabled={
            !(firstSelectedMerchant && secondSelectedMerchant) ||
            merchantsAreAdding
          }
          loading={merchantsAreAdding}
          type={"primary"}
          onClick={submitMerchants}
        >
          Submit
        </Button>
      </Space>
      <Divider/>
      <br />
      <h1>List of merchant pairs</h1>
      <div className={styles.merchantsList}>
        {merchantPairs.map((pair) => (
          <div
            className={`${styles.merchant} ${
              selectedPair === pair.id ? styles.selected : null
            }`}
            onClick={() => setSelectedPair(pair.id)}
          >
            <ComparisonCard
              merchantOne={pair?.merchant_one}
              merchantTwo={pair?.merchant_two}
              withShadow={false}
            />
          </div>
        ))}
      </div>
      <br />
      <div className={'flex gap-10'}>
        <Button
            disabled={!selectedPair || pairIsDeleting}
            loading={pairIsDeleting}
            type={"dashed"}
            onClick={deleteSelectedPair}
        >
          Delete selected pair
        </Button>
        <Button
            disabled={!selectedPair}
            type={"dashed"}
            onClick={()=>setSelectedPair('')}
        >
          Cancel selected
        </Button>
      </div>
      <Divider/>
      <h1>Add new merchant</h1>
      <Form layout={"inline"} form={form} onFinish={addNewMerchant}>
        <Form.Item name={"name"} rules={[{ required: true }]}>
          <Input placeholder={'Merchant name'} />
        </Form.Item>
        <Form.Item>
          <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              type="primary"
              htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
