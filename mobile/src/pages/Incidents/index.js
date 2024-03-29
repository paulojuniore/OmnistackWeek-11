import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';
import logoImg from '../../../assets/logo.png';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadIncidents() {
      const response = await api.get('/incidents');
      setIncidents(response.data);
      setTotal(response.headers['x-total-count']);
    }
    loadIncidents();
  }, []);

  function navigateToDetailScreen(incident) {
    navigation.navigate('Detail', { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList 
        data={incidents}
        style={styles.incidentsList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              { Intl.NumberFormat('pt-BR', 
                { style: 'currency', 
                  currency: 'BRL'})
                  .format(incident.value) }
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={ () => navigateToDetailScreen(incident) } >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}