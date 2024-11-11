import { useEffect } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { useForm } from 'react-hook-form'
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
import { TextInputField } from "components/TextInputField";
import { SelectInputField } from "components/SelectInputField";
import { ThemedView } from "components/ThemedView";
import { ThemedText } from "components/ThemedText";
import { DateInput } from "components/DateInput";
// constants
import { clientsIdAndNameAndPhoneNumber, coupons, procedures } from "constants/filters";

interface ScheduleForm {
  client: number;
  procedure: number;
  coupon: number;
  discountPercent: number;
  datetime: string;
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
      datetime: dayjs().toString(),
    },
    resolver: zodResolver(scheduleSchema),
  });

  const discountPercentValue = watch('discountPercent')
  const clientValue = watch('client')
  const couponValue = watch('coupon')
  const datetimeValue = watch('datetime')
  const procedureValue = watch('procedure')

  useEffect(() => {
    register('client')
    register('procedure')
    register('coupon')
    register('discountPercent')
    register('datetime')
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
      { name: 'datetime', value: datetimeValue },
      { name: 'discountPercent', value: discountPercentValue },
      { name: 'procedure', value: procedureValue }
    ];
  
    fields.forEach(({ name, value }) => {
      if (value) clearErrors(name as keyof ScheduleForm);
    });
  }, [clientValue, couponValue, datetimeValue, procedureValue, discountPercentValue])

  function onSubmit(data: any) {
    Alert.alert(JSON.stringify(data))
  }

  function breakName(fullname: string) {
    const [first, ...middle] = fullname.split(' ')
    const last = middle.pop()
    return `${first} ${last}`
  } 
 
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title='Agendar' goBack={() => navigation.goBack()} />
      <View style={{
        paddingVertical: 20,
        paddingHorizontal: 48,
        flex: 1,
        justifyContent: 'space-between',
      }}>
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
          />
          <SelectInputField<ScheduleForm>
            label='Procedimento'
            options={procedures.map(procedure => ({ label: procedure.name, value: procedure.id }))}
            value='procedure'
            setValue={setValue}
            selectedValue={getValues('client') ?? 0}
            error={errors.procedure?.message}
          />
          <SelectInputField<ScheduleForm>
            label='Cupom'
            options={coupons.map(coupon => ({ label: coupon.name, value: coupon.id }))}
            value='coupon'
            setValue={setValue}
            selectedValue={getValues('client') ?? 0}
            error={errors.coupon?.message}
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
          />
          <DateInput 
            label='Data e Hora' 
            placeholder='Data e Hora' 
            setValue={setValue}
            value='datetime'
            inputValue={getValues('datetime')}
            error={errors.datetime?.message}
          />
        </ScrollView>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <ThemedView 
            style={{
              paddingVertical: 16,
              alignItems: 'center',
              borderRadius: 12,
              marginTop: 20
            }}
            lightColor='#262626'
            darkColor='#EFEFEF'
          >
            <ThemedText 
              style={{ fontSize: 20, fontWeight: 'bold' }}
              lightColor="#ECEDEE"
              darkColor="#11181C"
            >
              Criar agendamento
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </View>
    </ThemedView>  
  );
}