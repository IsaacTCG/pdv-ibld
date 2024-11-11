import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.locale('pt-br');
dayjs.extend(duration);
dayjs.extend(relativeTime);

// components
import { Header } from "components/Header";
import { ThemedView } from "components/ThemedView";
// constants
import { schedulesMock } from "constants/schedules";
import { clientsIdAndNameAndPhoneNumber, coupons, procedures } from "constants/filters";
import { SelectInputField } from "components/SelectInputField";
import { TextInputField } from "components/TextInputField";
import { DateInput } from "components/DateInput";

interface ScheduleForm {
  client: number;
  procedure: number;
  coupon: number;
  discountPercent: number;
  datetime: string;
  realStartDatetime: string;
  isConfirmed: boolean;
  isNoShow: boolean;
}

const scheduleSchema = z.object({
  client: z.number({ required_error: 'Selecione um cliente' }),
  procedure: z.number({ required_error: 'Selecione um procedimento' }),
  coupon: z.number({ required_error: 'Selecione um cupom' }),
  discountPercent: z.number(),
  datetime: z.string({ required_error: 'Selecione uma data e hora' }).trim(),
}).partial({
  discountPercent: true,
})

export default function CreateScheduleScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { 
    getValues,
    register, 
    setValue, 
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
    } = useForm<ScheduleForm>({
    defaultValues: {
      discountPercent: 0,
      isConfirmed: true,
      datetime: dayjs().toString(),
    },
    resolver: zodResolver(scheduleSchema),
  });

  const discountPercentValue = watch('discountPercent')
  const clientValue = watch('client')
  const couponValue = watch('coupon')
  const datetimeValue = watch('datetime')
  const realStartDatetimeValue = watch('realStartDatetime')
  const procedureValue = watch('procedure')
  const isConfirmedValue = watch('isConfirmed')
  const isNoShowValue = watch('isNoShow')

  useEffect(() => {
    register('client')
    register('procedure')
    register('coupon')
    register('discountPercent')
    register('datetime')
    register('realStartDatetime')
    register('isConfirmed')
    register('isNoShow')
  }, [register])

  useEffect(() => {
    if (discountPercentValue > 100) {
      setValue('discountPercent', 100)
    }
  }, [discountPercentValue])

  useEffect(() => {
    const fields = [
      { name: 'client', value: clientValue },
      { name: 'coupon', value: couponValue },
      { name: 'procedure', value: procedureValue },
      { name: 'datetime', value: datetimeValue },
      { name: 'realStartDatetime', value: realStartDatetimeValue },
      { name: 'discountPercent', value: discountPercentValue },
      { name: 'isConfirmed', value: isConfirmedValue },
      { name: 'isNoShow', value: isNoShowValue },
    ];
  
    fields.forEach(({ name, value }) => {
      if (value) clearErrors(name as keyof ScheduleForm);
    });
  }, [
    clientValue, 
    couponValue, 
    datetimeValue, 
    realStartDatetimeValue, 
    procedureValue, 
    discountPercentValue, 
    isConfirmedValue, 
    isNoShowValue
  ])

  function onSubmit(data: any) {
  }

  useEffect(() => {
    const _schedule = schedulesMock.find((schedule) => schedule.id === Number(id));

    if (_schedule) {
      setValue('client', _schedule.client.id)
      setValue('procedure', _schedule.procedure.id)
      setValue('coupon', _schedule?.coupon?.id ?? 0)
      setValue('discountPercent', _schedule?.discountPercent ?? 0)
      setValue('datetime', _schedule.datetime.toString())
      setValue('realStartDatetime', _schedule.realStartDatetime?.toString() ?? dayjs().toString())
    }
  }, [id])

  function breakName(fullname: string) {
    const [first, ...middle] = fullname.split(' ')
    const last = middle.pop()
    return `${first} ${last}`
  } 

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title='Agendamento' goBack={() => navigation.goBack()} />
      <View style={{
        paddingVertical: 20,
        paddingHorizontal: 48,
        flex: 1,
        justifyContent: 'space-between',
        gap: 24
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}  
        >
          <TouchableOpacity
            onPress={() => setValue('isConfirmed', !isConfirmedValue)}
            style={{
              backgroundColor: '#000000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              height: 48,
              flex: 1,
              opacity: isConfirmedValue ? 1 : 0.5
            }}
          >
            <Feather name="check" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValue('isNoShow', !isNoShowValue)}
            style={{
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              height: 48,
              flex: 1,
              borderWidth: 1,
              borderColor: '#000000'
            }}
          >
            {
              isNoShowValue ? <Feather name="eye-off" size={24} color="black" /> : <Feather name="eye" size={24} color="black" />
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={console.log}
            style={{
              backgroundColor: '#ad041d',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              height: 48,
              flex: 1
            }}
          >
            <Feather name="trash-2" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ gap: 16 }}>
          <SelectInputField<ScheduleForm>
            label='Cliente'
            options={clientsIdAndNameAndPhoneNumber.map(client => 
              ({ label: `${(breakName(client.name))} - ${client.phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")}`, value: client.id }))
            }
            value='client'
            setValue={setValue}
            selectedValue={getValues('client') ?? 0}
            error={errors.client?.message}
            readOnly
          />
          <SelectInputField<ScheduleForm>
            label='Procedimento'
            options={procedures.map(procedure => ({ label: procedure.name, value: procedure.id }))}
            value='procedure'
            setValue={setValue}
            selectedValue={getValues('client') ?? 0}
            error={errors.procedure?.message}
            readOnly
          />
          <SelectInputField<ScheduleForm>
            label='Cupom'
            options={coupons.map(coupon => ({ label: coupon.name, value: coupon.id }))}
            value='coupon'
            setValue={setValue}
            selectedValue={getValues('client') ?? 0}
            error={errors.coupon?.message}
            readOnly
          />
          <TextInputField
            label='Desconto %' 
            placeholder='Desconto em %' 
            onChangeText={text => setValue('discountPercent', +text)}
            error={errors.discountPercent?.message}
            keyboardType="number-pad"
            value="discountPercent"
            inputValue={getValues('discountPercent')?.toString() ?? '0'}
            setValue={setValue}
            readOnly
          />
          <DateInput
            label='Data e Hora' 
            placeholder='Data e Hora' 
            setValue={setValue}
            value='datetime'
            inputValue={getValues('datetime')}
            error={errors.datetime?.message}
            readOnly
          />
          <DateInput
            label='Data e Hora Real' 
            placeholder='Data e Hora' 
            setValue={setValue}
            value='datetime'
            inputValue={getValues('datetime')}
            error={errors.realStartDatetime?.message}
            readOnly
          />
        </ScrollView>
      </View>
    </ThemedView>  
  );
}