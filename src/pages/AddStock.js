import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { useEffect } from 'react';
import { useState } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';

import { Button, Form, FormSelect } from 'semantic-ui-react';
const portfoyCollectionRef = collection(db, "portfoy")


export default function AddStock() {

    const names = [{ name: "Apple Teknoloji", nick: "aapl" },
    { name: "Google ", nick: "goog" }];

    useEffect(() => {


    }, [])

    const createCost = async () => {
        var hisseadı = names.find((p) => p.nick === values.nick)
        const docref = await addDoc(portfoyCollectionRef, { nick: values.nick, cost: values.cost, lot: values.lot, name: hisseadı.name })
        const stockDoc = doc(db, "portfoy", docref.id)
        await updateDoc(stockDoc, { id: docref.id })
        console.log(values)
        alert("Hisse eklendi")

    }
    const {
        values,
        handleSubmit,
        handleReset,
        handleChange,
        handleBlur,
        dirty,
        setFieldValue,
        onBlur,
    } = useFormik({
        initialValues: {
            cost: "",
            lot: "",
            nick: "",
            stockName: "",
            id: "0",

        },
        validationSchema: Yup.object({
            cost: Yup.number().required("Maliyet giriniz"),
            lot: Yup.number().required("Hisse adedi giriniz"),

        }),
    });
    const stockNameOptions = names.map((n) => ({
        //key:n.id,
        text: n.name,
        value: n.nick
    }))


    return (
        <div align="center" style={{ fontFamily: 'Josefin Sans', fontSize: '9' }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <div>
                            <a href='/portfoy'>Portfoy</a>
                        </div>
                    </Grid.Column>
                    <GridColumn width={13}>


                        <div>
                            <Form onSubmit={handleSubmit} style={{ marginTop: "100px", width: "550px", marginRight: "45px", fontSize: 15 }} >
                                <Form.Group widths="equal">
                                    <FormSelect
                                        id="name"
                                        onChange={(fieldname, data) => setFieldValue("nick", data.value)}
                                        onBlur={onBlur}
                                        options={stockNameOptions}
                                        label="Şirket"
                                        value={values.nick}

                                        placeholder='Şirket seçiniz'

                                    //error={errors.periodId && touched.periodId}

                                    />
                                </Form.Group>
                                <Form.Group style={{ marginTop: "20px" }} widths="equal">
                                    <Form.Input
                                        id="lot"
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lot}
                                        label="Lot "
                                        placaholder="Lot  giriniz"
                                        search
                                        selection
                                    ></Form.Input>

                                </Form.Group>
                                <Form.Group style={{ marginTop: "20px" }} widths="equal">
                                    <Form.Input
                                        id="cost"
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cost}
                                        label="Maliyet "
                                        placaholder="Maliyet  giriniz"
                                        search
                                        selection
                                    ></Form.Input>

                                </Form.Group>
                                <Button style={{ color: "black" }} onClick={createCost}>Hisse Ekle</Button>

                            </Form>
                        </div>
                    </GridColumn>

                </Grid.Row>
            </Grid>
        </div>
    )
}
