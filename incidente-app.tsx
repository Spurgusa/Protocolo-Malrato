import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Send, FileText, Bell } from 'lucide-react';

const IncidentReportApp = () => {
  const [step, setStep] = useState(1);
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const incidentTypes = {
    'falta-respeto': {
      level: 1,
      title: 'Falta de respeto',
      actions: [
        'Documentar el incidente',
        'Establecer límites por escrito',
        'Consultar con compañero mentor'
      ]
    },
    'amenaza-velada': {
      level: 2,
      title: 'Amenaza velada',
      actions: [
        'Activar red de apoyo',
        'Comunicación solo por escrito',
        'Informar al Colegio de Abogados'
      ]
    },
    'amenaza-directa': {
      level: 3,
      title: 'Amenaza directa',
      actions: [
        'Contactar autoridades',
        'Solicitar medidas de protección',
        'Denuncia inmediata'
      ]
    }
  };

  const handleSubmit = () => {
    const rec = incidentTypes[incidentType];
    setRecommendation(rec);
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sistema de Gestión de Incidentes</CardTitle>
          <CardDescription>
            Asistente para la gestión y reporte de situaciones conflictivas
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tipo de Incidente</h3>
              <RadioGroup
                value={incidentType}
                onValueChange={setIncidentType}
                className="space-y-2"
              >
                {Object.entries(incidentTypes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="flex items-center gap-2">
                      {value.title}
                      <Badge variant={value.level === 3 ? "destructive" : value.level === 2 ? "warning" : "secondary"}>
                        Nivel {value.level}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                onClick={() => setStep(2)}
                disabled={!incidentType}
                className="mt-4"
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Descripción del Incidente</h3>
              <Textarea
                placeholder="Describe la situación en detalle..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32"
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!description}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Reporte
                </Button>
              </div>
            </div>
          )}

          {step === 3 && recommendation && (
            <div className="space-y-4">
              <Alert variant={recommendation.level === 3 ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nivel {recommendation.level} - {recommendation.title}</AlertTitle>
                <AlertDescription>
                  Se ha registrado el incidente y se han activado los protocolos correspondientes.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-medium">Acciones Recomendadas:</h4>
                <ul className="space-y-2">
                  {recommendation.actions.map((action, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <FileText className="w-4 h-4" />
                  Nuevo Reporte
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentReportApp;