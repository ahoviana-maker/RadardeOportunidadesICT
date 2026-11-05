import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Calendar, DollarSign, Award, CheckCircle2, 
  ExternalLink, Building2, Tag, Bell, Info, ShieldCheck, 
  Clock, AlertCircle, X, ChevronRight, Sparkles, BookOpen, Layers
} from 'lucide-react';

// Dados Mockados Realistas de Editais não reembolsáveis voltados para ICTs
const MOCK_EDITAIS = [
  {
    id: 'fapemig-001',
    titulo: 'Programa de Apoio a Projetos de Pesquisa Científica e Tecnológica - Universal FAPEMIG 2026',
    agencia: 'FAPEMIG',
    modalidade: 'Auxílio à Pesquisa',
    status: 'Aberto',
    prazo: '2026-12-15',
    diasRestantes: 40,
    valorMaximo: 'R$ 250.000,00',
    orcamentoTotal: 'R$ 35.000.000,00',
    resumo: 'Financiamento a projetos de pesquisa científica, tecnológica e de inovação nas ICTs sediadas no Estado de Minas Gerais em qualquer área do conhecimento.',
    areas: ['Multidisciplinar', 'Pesquisa Básica', 'Inovação'],
    elegibilidadeICT: 'Exclusivo para ICTs sediadas em MG e Fundações de Apoio credenciadas.',
    requisitos: [
      'Coordenador com título de Doutor e vínculo formal com a ICT.',
      'Anuência expressa do órgão diretivo da ICT proponente.',
      'Projeto com duração de até 24 meses.'
    ],
    cronograma: [
      { fase: 'Lançamento do Edital', data: '01/10/2026' },
      { fase: 'Submissão de Propostas', data: 'Até 15/12/2026' },
      { fase: 'Divulgação dos Resultados', data: 'Fevereiro/2027' }
    ],
    linkOficial: 'https://fapemig.br/pt/chamadas/'
  },
  {
    id: 'finep-002',
    titulo: 'Pro-Infra ICT 2026 - Recuperação e Modernização de Infraestrutura de Pesquisa',
    agencia: 'FINEP',
    modalidade: 'Subvenção / Infraestrutura',
    status: 'Aberto',
    prazo: '2026-11-28',
    diasRestantes: 23,
    valorMaximo: 'R$ 5.000.000,00',
    orcamentoTotal: 'R$ 180.000.000,00',
    resumo: 'Apoio financeiro não reembolsável para recuperação, atualização e aquisição de equipamentos de grande porte para laboratórios e infraestrutura multiusuária em ICTs.',
    areas: ['Infraestrutura', 'Laboratórios Multiusuários', 'Biotecnologia', 'IA'],
    elegibilidadeICT: 'ICTs Públicas ou Privadas sem fins lucrativos qualificadas no Ministério da Ciência, Tecnologia e Inovação.',
    requisitos: [
      'Plano de gestão transparente para acesso multiusuário aos equipamentos.',
      'Contrapartida não financeira institucional demonstrada.',
      'Submissão prioritária de propostas institucionais consolidadas.'
    ],
    cronograma: [
      { fase: 'Abertura do Sistema', data: '15/09/2026' },
      { fase: 'Encerramento de Propostas', data: '28/11/2026' },
      { fase: 'Resultado Preliminar', data: 'Janeiro/2027' }
    ],
    linkOficial: 'http://www.finep.gov.br/chamadas-publicas'
  },
  {
    id: 'cnpq-003',
    titulo: 'Chamada Pública CNPq nº 12/2026 - Doutorado e Pós-Doutorado Estratégico em IA',
    agencia: 'CNPq',
    modalidade: 'Bolsas de Pesquisa',
    status: 'Encerrando em breve',
    prazo: '2026-11-12',
    diasRestantes: 7,
    valorMaximo: 'R$ 480.000,00',
    orcamentoTotal: 'R$ 20.000.000,00',
    resumo: 'Concessão de bolsas de pesquisa pós-doutoral e doutorado para fixação de pesquisadores em ICTs em redes de pesquisa focadas em Inteligência Artificial e Transição Energética.',
    areas: ['Inteligência Artificial', 'Ciência de Dados', 'Transição Energética'],
    elegibilidadeICT: 'Programas de Pós-Graduação reconhecidos pela CAPES vinculados a ICTs públicas ou privadas.',
    requisitos: [
      'Proposta associada a plano de trabalho alinhado à Estratégia Nacional de IA.',
      'Coordenador pesquisador bolsista de Produtividade do CNPq.'
    ],
    cronograma: [
      { fase: 'Início das Inscrições', data: '01/09/2026' },
      { fase: 'Data Limite', data: '12/11/2026' },
      { fase: 'Implementação das Bolsas', data: 'Dezembro/2026' }
    ],
    linkOficial: 'https://www.gov.br/cnpq/pt-br/chamadas-publicas'
  },
  {
    id: 'bndes-004',
    titulo: 'BNDES Fundo Tecnológico (FUNTEC) - Parcerias ICT-Empresa para Hidrogênio Verde',
    agencia: 'BNDES',
    modalidade: 'Convênio Não Reembolsável',
    status: 'Aberto',
    prazo: '2027-01-30',
    diasRestantes: 86,
    valorMaximo: 'R$ 12.000.000,00',
    orcamentoTotal: 'R$ 100.000.000,00',
    resumo: 'Apoio financeiro não reembolsável a projetos de pesquisa aplicada e desenvolvimento tecnológico executados por ICTs em parceria obrigatória com empresas do setor energético.',
    areas: ['Energia Limpa', 'Hidrogênio Verde', 'Agronegócio Sustentável'],
    elegibilidadeICT: 'Apenas ICTs como executoras principais do projeto tecnológico.',
    requisitos: [
      'Parceria formalizada com ao menos 1 empresa interventora.',
      'Nível de Maturidade Tecnológica (TRL 3 a 7).',
      'Verba 100% não reembolsável destinada estritamente aos custos da ICT.'
    ],
    cronograma: [
      { fase: 'Abertura do Edital', data: '10/10/2026' },
      { fase: 'Submissão Contínua até', data: '30/01/2027' },
      { fase: 'Análise de Mérito', data: 'Fluxo Contínuo' }
    ],
    linkOficial: 'https://www.bndes.gov.br/wps/portal/site/inicio/funtec'
  },
  {
    id: 'pref-bh-005',
    titulo: 'Edital Produtividade Cidades Inteligentes - PBH / ICTs Regionais',
    agencia: 'Prefeituras',
    modalidade: 'Auxílio à Pesquisa',
    status: 'Previsto',
    prazo: '2027-02-15',
    diasRestantes: 102,
    valorMaximo: 'R$ 180.000,00',
    orcamentoTotal: 'R$ 2.000.000,00',
    resumo: 'Seleção de soluções tecnológicas e pesquisas aplicadas desenvolvidas por ICTs locais para desafios urbanos (mobilidade, saneamento e gestão de resíduos).',
    areas: ['Smart Cities', 'Mobilidade Urbana', 'Sustentabilidade'],
    elegibilidadeICT: 'ICTs sediadas na Região Metropolitana de Belo Horizonte.',
    requisitos: [
      'Proposta voltada para testes em ambiente real de gestão pública (Living Lab).',
      'Participação de alunos de graduação ou pós-graduação no projeto.'
    ],
    cronograma: [
      { fase: 'Pré-lançamento do Termo de Referência', data: '10/11/2026' },
      { fase: 'Abertura das Inscrições', data: '15/01/2027' },
      { fase: 'Prazo Final', data: '15/02/2027' }
    ],
    linkOficial: 'https://prefeitura.pbh.gov.br/editais'
  },
  {
    id: 'fapesp-006',
    titulo: 'Chamada de Pesquisa em Parceria Estratégica ICT-Empresas Estatais (Petrobras/Embrapa)',
    agencia: 'Empresas Estatais',
    modalidade: 'Subvenção / P&D',
    status: 'Aberto',
    prazo: '2026-12-05',
    diasRestantes: 30,
    valorMaximo: 'R$ 3.500.000,00',
    orcamentoTotal: 'R$ 40.000.000,00',
    resumo: 'Apoio a redes interinstitucionais de ICTs para o desenvolvimento de soluções de descarbonização e transição justa para a indústria petrolífera e agroindustrial.',
    areas: ['Descarbonização', 'Agrotech', 'Biotecnologia'],
    elegibilidadeICT: 'Consórcio de no mínimo 2 ICTs brasileiras e Fundação de Apoio contratada.',
    requisitos: [
      'Dedicação exclusiva dos pesquisadores associados durante a vigência do auxílio.',
      'Propriedade intelectual compartilhada conforme Lei de Inovação.'
    ],
    cronograma: [
      { fase: 'Chamada Conjunta', data: '01/10/2026' },
      { fase: 'Submissão de Propostas', data: '05/12/2026' },
      { fase: 'Análise de Pares', data: 'Janeiro/2027' }
    ],
    linkOficial: 'https://fapesp.br/chamadas'
  }
];

const AGENCIAS = ['Todas', 'FINEP', 'FAPEMIG', 'CNPq', 'BNDES', 'Prefeituras', 'Empresas Estatais'];
const MODALIDADES = ['Todas', 'Auxílio à Pesquisa', 'Subvenção / Infraestrutura', 'Bolsas de Pesquisa', 'Convênio Não Reembolsável', 'Subvenção / P&D'];
const STATUS_OPTIONS = ['Todos', 'Aberto', 'Encerrando em breve', 'Previsto'];

export default function App() {
  const [busca, setBusca] = useState('');
  const [agenciaSelecionada, setAgenciaSelecionada] = useState('Todas');
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState('Todas');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [editalSelecionado, setEditalSelecionado] = useState(null);
  const [modalAlertaAberto, setModalAlertaAberto] = useState(false);
  const [emailAlerta, setEmailAlerta] = useState('');
  const [alertaSucesso, setAlertaSucesso] = useState(false);

  // Filtragem dos editais
  const editaisFiltrados = useMemo(() => {
    return MOCK_EDITAIS.filter(item => {
      const atendeBusca = 
        item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        item.resumo.toLowerCase().includes(busca.toLowerCase()) ||
        item.areas.some(a => a.toLowerCase().includes(busca.toLowerCase()));

      const atendeAgencia = agenciaSelecionada === 'Todas' || item.agencia === agenciaSelecionada;
      const atendeModalidade = modalidadeSelecionada === 'Todas' || item.modalidade === modalidadeSelecionada;
      const atendeStatus = statusSelecionado === 'Todos' || item.status === statusSelecionado;

      return atendeBusca && atendeAgencia && atendeModalidade && atendeStatus;
    });
  }, [busca, agenciaSelecionada, modalidadeSelecionada, statusSelecionado]);

  // Função para cores das agências
  const getAgenciaBadge = (agencia) => {
    switch (agencia) {
      case 'FINEP': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FAPEMIG': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CNPq': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'BNDES': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Prefeituras': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleCadastrarAlerta = (e) => {
    e.preventDefault();
    if (emailAlerta) {
      setAlertaSucesso(true);
      setTimeout(() => {
        setAlertaSucesso(false);
        setModalAlertaAberto(false);
        setEmailAlerta('');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* BANNER SUPERIOR INFORMATIVO */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Filtro de Exclusividade Ativo: <strong>100% Oportunidades Não Reembolsáveis</strong> elegíveis para ICTs e Fundações de Apoio.</span>
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Logo e Título */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Radar de Editais ICT
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Nacional
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Centralizador unificado de fomento à pesquisa e inovação sem contrapartida financeira
                </p>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => setModalAlertaAberto(true)}
                className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2.5 rounded-lg border border-blue-200 text-sm transition-all shadow-sm"
              >
                <Bell className="w-4 h-4 text-blue-600" />
                <span>Receber Novas Chamadas</span>
              </button>
            </div>
          </div>

          {/* BARRA DE BUSCA EM DESTAQUE */}
          <div className="mt-5 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por objeto (ex: Inteligência Artificial, FAPEMIG, Bolsas, Infraestrutura)..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
              />
              {busca && (
                <button 
                  onClick={() => setBusca('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (LAYOUT COM PAINEL LATERAL + GRADE) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* PAINEL LATERAL DE FILTROS */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm sticky top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span>Filtros Específicos</span>
                </div>
                {(agenciaSelecionada !== 'Todas' || modalidadeSelecionada !== 'Todas' || statusSelecionado !== 'Todos' || busca !== '') && (
                  <button 
                    onClick={() => {
                      setAgenciaSelecionada('Todas');
                      setModalidadeSelecionada('Todas');
                      setStatusSelecionado('Todos');
                      setBusca('');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Tag Fixa Obrigatoriedade */}
              <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Filtro Rígido Aplicado:</span>
                  Apenas subvenções, auxílios e bolsas não reembolsáveis direcionados a ICTs.
                </div>
              </div>

              {/* Filtro por Agência / Órgão */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Agência / Órgão Fomentador
                </label>
                <div className="space-y-1.5">
                  {AGENCIAS.map((agencia) => (
                    <button
                      key={agencia}
                      onClick={() => setAgenciaSelecionada(agencia)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        agenciaSelecionada === agencia
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{agencia}</span>
                      {agenciaSelecionada === agencia && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro por Modalidade */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tipo de Modalidade
                </label>
                <select
                  value={modalidadeSelecionada}
                  onChange={(e) => setModalidadeSelecionada(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {MODALIDADES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Status da Chamada */}
              <div className="mt-5 pt-5 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Status das Inscrições
                </label>
                <div className="space-y-1.5">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusSelecionado(st)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        statusSelecionado === st
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{st}</span>
                      {statusSelecionado === st && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* LISTA E CARDS DE EDITAIS */}
          <section className="lg:col-span-3 space-y-6">
            
            {/* Cabeçalho do Resultado */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200">
              <p className="text-sm text-slate-600 font-medium">
                Exibindo <span className="font-bold text-slate-900">{editaisFiltrados.length}</span> editais e chamadas ativas
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Info className="w-4 h-4 text-blue-500" />
                <span>Atualizado diariamente via raspagem oficial</span>
              </div>
            </div>

            {/* Mensagem para Resultados Vazios */}
            {editaisFiltrados.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Nenhum edital encontrado</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
                  Não encontramos chamadas não reembolsáveis com os filtros atuais. Tente buscar por outros termos ou limpar os filtros laterais.
                </p>
                <button
                  onClick={() => {
                    setAgenciaSelecionada('Todas');
                    setModalidadeSelecionada('Todas');
                    setStatusSelecionado('Todos');
                    setBusca('');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Restaurar Todos os Editais
                </button>
              </div>
            )}

            {/* GRADE DOS CARDS DE EDITAL */}
            <div className="grid grid-cols-1 gap-5">
              {editaisFiltrados.map((edital) => (
                <div 
                  key={edital.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between group"
                >
                  
                  {/* Topo do Card */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      
                      {/* Agência & Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getAgenciaBadge(edital.agencia)}`}>
                          {edital.agencia}
                        </span>
                        
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Não Reembolsável
                        </span>

                        <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md">
                          {edital.modalidade}
                        </span>
                      </div>

                      {/* Status / Prazo */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {edital.diasRestantes <= 10 ? (
                          <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                            <Clock className="w-3.5 h-3.5" /> Encerra em {edital.diasRestantes} dias
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" /> Até {new Date(edital.prazo).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Título do Edital */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                      {edital.titulo}
                    </h3>

                    {/* Resumo */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {edital.resumo}
                    </p>

                    {/* Meta Informações (Valores e Tags) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div className="text-xs">
                          <span className="text-slate-400 block">Teto por Projeto:</span>
                          <span className="font-bold text-slate-800">{edital.valorMaximo}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="text-xs">
                          <span className="text-slate-400 block">Orçamento Global:</span>
                          <span className="font-bold text-slate-800">{edital.orcamentoTotal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags Áreas Temáticas */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      {edital.areas.map((area, idx) => (
                        <span key={idx} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded transition-colors">
                          {area}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Rodapé do Card */}
                  <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Elegível: <strong className="text-slate-700">ICTs / Docentes</strong>
                    </span>

                    <button
                      onClick={() => setEditalSelecionado(edital)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-all"
                    >
                      <span>Ver Detalhes do Edital</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </section>

        </div>
      </main>

      {/* MODAL DETALHADO DO EDITAL */}
      {editalSelecionado && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Header Modal */}
            <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${getAgenciaBadge(editalSelecionado.agencia)}`}>
                    {editalSelecionado.agencia}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Não Reembolsável
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {editalSelecionado.titulo}
                </h2>
              </div>
              <button 
                onClick={() => setEditalSelecionado(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-6 text-sm text-slate-700">
              
              {/* Resumo */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Escopo do Fomento</h4>
                <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {editalSelecionado.resumo}
                </p>
              </div>

              {/* Valores e Prazos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-medium block">Valor Máximo por Projeto</span>
                  <span className="text-base font-bold text-blue-900">{editalSelecionado.valorMaximo}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Prazo Final de Submissão</span>
                  <span className="text-base font-bold text-slate-800">
                    {new Date(editalSelecionado.prazo).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Elegibilidade ICT */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Elegibilidade para Instituições (ICTs)
                </h4>
                <p className="text-xs bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 font-medium">
                  {editalSelecionado.elegibilidadeICT}
                </p>
              </div>

              {/* Requisitos Mínimos */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Principais Requisitos</h4>
                <ul className="space-y-2">
                  {editalSelecionado.requisitos.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cronograma Resumido */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Cronograma Previsto</h4>
                <div className="space-y-2">
                  {editalSelecionado.cronograma.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">{item.fase}</span>
                      <span className="font-semibold text-slate-900">{item.data}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Rodapé Modal */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
              <span className="text-xs text-slate-500">Link oficial verificado pela plataforma</span>
              <a 
                href={editalSelecionado.linkOficial} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
              >
                <span>Acessar Página da Chamada</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE ALERTAS POR E-MAIL */}
      {modalAlertaAberto && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button 
              onClick={() => setModalAlertaAberto(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <Bell className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Receber Alertas de Novas Chamadas</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Cadastre seu e-mail institucional para receber notificações semanais de novos editais não reembolsáveis abertos para ICTs.
            </p>

            {alertaSucesso ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Inscrição realizada com sucesso! Você receberá nosso boletim semanal.</span>
              </div>
            ) : (
              <form onSubmit={handleCadastrarAlerta} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail Institucional</label>
                  <input 
                    type="email" 
                    required
                    placeholder="seu.nome@ict.edu.br ou @pesquisador.br"
                    value={emailAlerta}
                    onChange={(e) => setEmailAlerta(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors shadow-sm"
                >
                  Confirmar Inscrição
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
          <p>© 2026 Radar de Editais ICT - Plataforma de apoio ao ecossistema de ciência, tecnologia e inovação.</p>
          <p className="text-slate-400">
            Monitoramento automatizado de agências oficiais: FINEP, FAPEMIG, CNPq, BNDES, CAPES e Prefeituras.
          </p>
        </div>
      </footer>

    </div>
  );
}